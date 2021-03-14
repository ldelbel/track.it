import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from './pages/app/App';
import Run from './pages/run';
import Login from './pages/login'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/app' component={App} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/run' component={Run} />
      </Switch>
    </Router>
  )
}

export default Routes;