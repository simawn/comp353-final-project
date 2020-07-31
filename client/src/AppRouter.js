import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Views
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";

const AppRouter = () => (
  <Router>
    <Route exact path="/">
      <Redirect to="/dashboard" />
    </Route>
    <Route exact path="/login" component={Login} />
    <Route exact path="/dashboard" component={Dashboard} />
  </Router>
);

export default AppRouter;
