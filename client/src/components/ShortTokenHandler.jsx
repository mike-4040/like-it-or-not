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
      if (user) {
        window.location.replace('/');
      }
    } catch (err) {
      setError(err);
      console.log('error :', error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);
  /** @todo:
   * 1.send token to /api/auth/token as param
   * 2. Accept real token and save it in local storage
   */

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
