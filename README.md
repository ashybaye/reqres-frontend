## Front-end application using ReqRes API

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This app will communicate with the local spring java service running on http://localhost:8080 that serves as a middleware while communicating with [Reqres API](https://reqres.in/). Make sure that this java service is running.

### To run locally:
- Install all dependencies: `npm install`
- Serve the site on http://localhost:8081: `npm start`

### To do:
- test coverage (unit, e2e)
- user authentication using the java service instead of Reqres api
- creating a resource