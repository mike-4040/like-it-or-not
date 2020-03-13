import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import CreateRecord from './components/Pages/CreateRecord';
import MainPage from './components/Pages/MainPage';
import { AppContext } from './Context';
import AdminPage from './components/Pages/AdminPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import PageNotFound from './components/Pages/PageNotFound';

export default function App() {
  const { user } = useContext(AppContext);

  return (
    <>
      <Switch>
        <Route path='/signin'>
          {user ? <Redirect to='/main' /> : <SignIn />}
        </Route>
        <Route path='/signup'>
          {user ? <Redirect to='/main' /> : <SignUp />}
        </Route>
        <ProtectedRoute path='/record' component={CreateRecord} user={user} />
        <ProtectedRoute path='/main' component={MainPage} user={user} />
        <ProtectedRoute path='/admin' component={AdminPage} user={user} />
        <Route exact path='/' component={user ? MainPage : SignIn} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </>
  );
}
