import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AuthService from '../utils/AuthService';

const Auth = new AuthService();

export default function ShortTokenHandler() {
  const { token } = useParams();
  const [error, setError] = useState();

  useEffect(() => {
    const getToken = async () => {
      console.log('gettoken');
      try {
        const error = await Auth.googlePassportToken(token);
        if (!error) window.location.replace('/main');
        else {
          console.log('Can"t exchenage token', error.errmsg);
          window.location.replace('/signin');
        }
      } catch (err) {
        setError(err);
        console.log('getToken / error :', error);
        window.location.replace('/signin');
      }
    };

    getToken();
  }, [token, error]);

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
