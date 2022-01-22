import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Routes from './components/routing/Routes'
import Alert from './components/layout/Alert'

// Redux
import { Provider } from 'react-redux'
import store from './store'

import './App.css'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
