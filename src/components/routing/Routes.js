import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Register from '../auth/Register'
import Login from '../auth/Login'
import NotFound from '../layout/NotFound'

const Routes = props => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default Routes
