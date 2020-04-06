import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  spinner: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default function LoadingSpinner() {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <CircularProgress color='primary' />
    </div>
  );
}
