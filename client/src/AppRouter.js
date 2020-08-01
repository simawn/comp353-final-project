import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Views
import JobBoard from "./views/JobBoard";
import Login from "./views/Login";
import Register from './views/Register';
import UserCheck from './views/UserCheck';

const AppRouter = () => (
  <Router>
    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/jobboard" component={JobBoard} />
    <Route exact path="/usercheck" component={UserCheck} />
  </Router>
);

export default AppRouter;
