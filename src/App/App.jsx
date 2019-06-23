import React from 'react';
import { BrowserRouter, Switch, Redirect } from "react-router-dom"
import './App.scss';

import { Login } from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

import PublicRoute from '../_components/PublicRoute'
import PrivateRoute from '../_components/PrivateRoute'
import { validateLogin } from '../_helpers/auth';
export default () =>  {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <PublicRoute restricted={false} component={Home} path="/" exact /> */}
          <PublicRoute restricted={true} component={Login} path="/login" exact />
          <PrivateRoute restricted={true} component={Dashboard} path="/dashboard"/>
          {
            validateLogin() ? 
            <Redirect to="/dashboard" /> 
            :<Redirect to="/login" />
          }
          
        </Switch>
      </BrowserRouter>
    </div>
  );


}
