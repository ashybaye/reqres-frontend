import React, { useState, useEffect } from 'react';
import UserDataService from '../services/UserService';
import { Link } from 'react-router-dom';
import IUserData from '../types/User';
import { getCurrentUser } from '../services/AuthService';

const UsersList: React.FC = () => {
  const currentUser = getCurrentUser();
  const [Users, setUsers] = useState<Array<IUserData>>([]);
  const [TotalPages, setPages] = useState(0);
  const [CurrentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var page: any = urlParams.has('page') ? urlParams.get('page') : 1;
    retrieveUsers(page);
  }, []);

  const retrieveUsers = (page: any) => {
    UserDataService.getAll(page)
      .then((response: any) => {
        setUsers(response.data.data);
        setPages(response.data.total_pages);
        setCurrentPage(response.data.page);
        // console.log(response.data);
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
            href={'/users?page=' + i}
            onClick={() => retrieveUsers(i)}
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
          <h1>Users List</h1>

          <table className="border-b font-medium dark:border-neutral-500">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-4"
                >
                  Avatar
                </th>
                <th
                  scope="col"
                  className="px-6 py-4"
                >
                  User info
                </th>
                <th
                  scope="col"
                  className="px-6 py-4"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Users &&
                Users.map((User, index) => (
                  <tr key={index}>
                    <td>{User.id}</td>
                    <td>
                      <img
                        src={User.avatar}
                        alt={
                          'Image of ' + User.first_name + ' ' + User.last_name
                        }
                      />
                    </td>
                    <td>
                      {User.first_name} {User.last_name} <br />
                      <Link to={User.email}>{User.email}</Link>
                    </td>
                    <td>
                      <Link
                        to={'/users/' + User.id}
                        className='waves-effect waves-light btn btn-small'
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ul className="pagination">
            <li className="disabled">
              <a href="#!">
                <i className="material-icons">chevron_left</i>
              </a>
            </li>
            {TotalPages && pagination(TotalPages)}
            <li className="waves-effect">
              <a href="#!">
                <i className="material-icons">chevron_right</i>
              </a>
            </li>
          </ul>
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

export default UsersList;
