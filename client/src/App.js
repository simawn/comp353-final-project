import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect } from 'react-router-dom'

import Register from './screens/Register'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route component={() => <Redirect to={{ pathname: '/register' }} />} exact path={'/'} />
          <Route component={Register} exact path={'/register'} />
          <Route component={Login} exact path={'/login'} />
          <Route component={Dashboard} exact path={'/dashboard'} />
        </BrowserRouter>
      </div>
    )
  }
}
