import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import CreateRecord from './components/Pages/CreateRecord';
import MainPage from './components/Pages/MainPage';

// import { AppContext } from './Context';
import AdminPage from './components/Pages/AdminPage';

export default function App() {
  // const { user } = useContext(AppContext);
  // console.log('user', user);

  return (
    <>
      <Switch>
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/record' component={CreateRecord} />
        <Route exact path='/main' component={MainPage} />
        <Route exact path='/admin' component={AdminPage} />
        <Route exact path='/' component={SignUp} />
        {/* <Route component={PageNotFound} /> */}
      </Switch>
    </>
  );
}
