import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Views
import JobBoard from "./views/JobBoard";
import Login from "./views/Login";
import Register from './views/Register';

const AppRouter = () => (
  <Router>
    <Route exact path="/">
      <Redirect to="/jobboard" />
    </Route>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/jobboard" component={JobBoard} />
  </Router>
);

export default AppRouter;
