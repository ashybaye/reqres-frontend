import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

import * as AuthService from './services/AuthService';
import IUserAuth from './types/UserAuth';

import Login from './components/Login';
import User from './components/User';
import UsersList from './components/UsersList';
// import Resource from './components/Resource';
import ResourcesList from './components/ResourcesList';
import EventBus from './services/EventBus';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUserAuth | undefined>(
    undefined
  );

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on('logout', logOut);

    return () => {
      EventBus.remove('logout', logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper container">
          <a
            href="/"
            className="brand-logo"
          >
            Reqres Frontend App
          </a>
          <ul
            id="nav-mobile"
            className="right hide-on-med-and-down"
          >
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link
                    to={'/users'}
                    className="nav-link"
                  >
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={'/resources'}
                    className="nav-link"
                  >
                    Resources
                  </Link>
                </li>              
                <li className="nav-item">
                  <Link
                    to={'/profile'}
                    className="nav-link"
                  >
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="/login"
                    className="nav-link"
                    onClick={logOut}
                  >
                    Log out
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  to={'/login'}
                  className="nav-link"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/users"
            element={<UsersList />}
          />
          <Route
            path="/users/:id"
            element={<User />}
          /> 
          <Route
            path="/resources"
            element={<ResourcesList />}
          />
          {/* <Route
            path="/resources/:id"
            element={<Resource />}
          />                    */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
