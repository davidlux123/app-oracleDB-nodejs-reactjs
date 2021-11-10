import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Guest from './pages/Guest'
import {Login} from './pages/Login';
import { HomeAdmin } from './pages/adminPages/HomeAdmin';
import { UpdateUser } from './pages/adminPages/UpdateUser';
import { CreateUser } from './pages/adminPages/CreateUser';
import { CargaMasiva } from './pages/adminPages/CargaMasiva';
import { PrivateRoute } from './routes/PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';

export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Switch>
            {/*<Route exact path ='/pruba' component = {} />*/}
            <Route exact path ='/' component = {Guest} />
            <Route exact path ='/login' component = {Login} />
            <PrivateRoute exact path ='/admin' component = {HomeAdmin} />
            <PrivateRoute exact path ='/admin/update' component = {UpdateUser} />
            <PrivateRoute exact path ='/admin/create' component = {CreateUser} />
            <Route exact path ='/admin/cargaMasiva' component = {CargaMasiva} />
          </Switch>
        </Router>
      </AuthProvider>
    )
  }
}

