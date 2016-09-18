import React from 'react';
import {Route} from 'react-router';
import gaSend from 'helpers/ga-send';
import Auth from 'screens/auth';
import Register from 'screens/auth/screens/register';
import Login from 'screens/auth/screens/login';

export default [
  <Route component={Auth}>
    <Route path='/admin/register' component={Register} onEnter={gaSend} />
    <Route path='/admin/login' component={Login} onEnter={gaSend} />
  </Route>
];
