import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import UserDataService from '../services/UserService';
import IUserData from '../types/User';

const User: React.FC = () => {
  const { id } = useParams();
  // let navigate = useNavigate();

  const initialUserState = {
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  };
  const [currentUser, setCurrentUser] = useState<IUserData>(initialUserState);
  const [message, setMessage] = useState<string>('');

  const getUser = (id: string) => {
    UserDataService.get(id)
      .then((response: any) => {
        setCurrentUser(response.data.data);
        // console.log(response.data.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getUser(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    console.log(currentUser.id);
    UserDataService.update(currentUser.id, currentUser)
      .then((response: any) => {
        console.log(response.data);
        setMessage('The user was updated successfully!');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    UserDataService.remove(currentUser.id)
      .then((response: any) => {
        console.log(response.data);
        // navigate('/users');
        setMessage('The user was deleted successfully!');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  console.log(currentUser);
  return (
    <>
      {currentUser ? (
        <div className="edit-form">
          <h2>User Details</h2>
          <Formik
            initialValues={initialUserState}
            // validationSchema={validationSchema}
            onSubmit={updateUser}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="first_name">First name</label>
                <Field
                  name="first_name"
                  type="text"
                  className="form-control"
                  id="first_name"
                  value={currentUser.first_name}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="last_name">Last name</label>
                <Field
                  name="last_name"
                  type="text"
                  className="form-control"
                  id="last_name"
                  value={currentUser.last_name}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  name="submit"
                  className="waves-effect waves-light btn"
                  onClick={updateUser}
                >
                  Update
                </button>
                 
                <button
                  type="button"
                  name="delete"
                  className="waves-effect waves-light btn"
                  onClick={deleteUser}
                >
                  Delete
                </button>
              </div>

              {message && <h4 className='red-text text-lighten-2'>{message}</h4>}
            </Form>
          </Formik>
        </div>
      ) : (
        <div>Please select a user.</div>
      )}
    </>
  );
};

export default User;
