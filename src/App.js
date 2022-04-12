import React from 'react';

import "./app.css"
import Dashboard from './pages/dashboard/Dashboard';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Login from './pages/login/Login';


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/dashboard/home'>
            <Dashboard />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
