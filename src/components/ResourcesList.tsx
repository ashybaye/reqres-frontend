import React, { useState, useEffect } from 'react';
import ResourceDataService from '../services/ResourceService';
import { Link } from 'react-router-dom';
import IResourceData from '../types/Resource';
import { getCurrentUser } from '../services/AuthService';

const ResourcesList: React.FC = () => {
  const currentUser = getCurrentUser();
  const [Resources, setResources] = useState<Array<IResourceData>>([]);
  const [TotalPages, setPages] = useState(0);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var page: any = urlParams.has('page') ? urlParams.get('page') : 1;

    retrieveResources(page);
  }, []);

  const retrieveResources = (page: any) => {
    ResourceDataService.getAll(page)
      .then((response: any) => {
        setResources(response.data.data);
        setPages(response.data.total_pages);
        setCurrentPage(response.data.page);
        // console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  function deleteResource(id: number) {
    console.log("requesting to delete", id)
    ResourceDataService.remove(id)
      .then((response: any) => {
        console.log(response.data);
        // navigate('/users');
        setMessage(`The resource ${id} was deleted successfully.`);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const pagination = (pages: number) => {
    let contentPaginated = [];
    console.log(CurrentPage);
    for (let i = 1; i <= pages; i++) {
      contentPaginated.push(
        <li
          className="waves-effect"
          key={i}
        >
          <a
            href={'/resources?page=' + i}
            onClick={() => retrieveResources(i)}
            aria-current={CurrentPage === i ? 'page' : 'false'}
          >
            {i}
          </a>
        </li>
      );
    }
    return contentPaginated;
  };

  return (
    <div>
      {currentUser ? (
        <>
          <h1>Resources List</h1>
          {message && <h4 className="red-text text-lighten-2">{message}</h4>}
          <div className="row">
            {Resources &&
              Resources.map((Resource, index) => (
                <div className="col s12 m5" key={index}>
                  <div
                    className="card-panel"
                    style={{ backgroundColor: Resource.color }}
                  >
                    <div className="card-overlay">
                      <span className="white-text">
                        ID: {Resource.id} <br />
                        Name: {Resource.name} <br />
                        Color: {Resource.color} <br />
                        Pantone value: {Resource.pantone_value}
                      </span>
                      <br/>
                      <button
                        type="button"
                        name="delete"
                        className='waves-effect waves-light btn btn-small'
                        onClick={() => deleteResource(Resource.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <ul className="pagination">{TotalPages && pagination(TotalPages)}</ul>
        </>
      ) : (
        <>
          <h1>Access denied</h1>
          <p className="center-align">
            Please <Link to="login">log in</Link>.
          </p>
        </>
      )}
    </div>
  );
};

export default ResourcesList;
