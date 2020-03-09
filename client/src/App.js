import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateRecord from './components/CreateRecord';
import MainPage from './components/MainPage';

import { AppContext } from './Context';
import AdminPage from './components/AdminPage';

export default function App() {
  const { user } = useContext(AppContext);
  // console.log('user', user);

  return (
    <>
      <Switch>
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/record' component={CreateRecord} />
        <Route exact path='/main' component={MainPage} />
        <Route exact path='/' component={AdminPage} />
        {/* <Route component={PageNotFound} /> */}
      </Switch>
    </>
  );
}
