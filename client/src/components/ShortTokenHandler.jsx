import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AuthService from '../utils/AuthService';

const Auth = new AuthService();

export default function ShortTokenHandler() {
  const { token } = useParams();
  const [error, setError] = useState();

  const getToken = async () => {
    try {
      const user = await Auth.googlePassportToken(token);
      if (user) window.location.replace('/');
    } catch (err) {
      setError(err);
      console.log('getToken / error :', error);
      window.location.replace('/signin');
    }
  };

  useEffect(() => {
    getToken();
  }, []);


  let style = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  return (
    <div style={style}>
      <CircularProgress color='secondary' />
      {error && (
        <h1 style={{ color: 'red' }}>
          Oops, something went wrong, please try log in again
        </h1>
      )}
    </div>
  );
}
