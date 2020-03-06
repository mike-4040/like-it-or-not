import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateRecord from './components/CreateRecord';
import MainPage from './components/MainPage';

import { AppContext } from './Context';

export default function App() {
  const { user } = useContext(AppContext);
  console.log('user', user);
  // const user = null;
  return (
    <>
      <Switch>
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/record' component={CreateRecord} />
        <Route path='/record' component={CreateRecord} />
        <Route exact path='/' component={user ? MainPage : SignIn} />
        {/* <Route component={PageNotFound} /> */}
      </Switch>
    </>
  );
}
