import React from 'react';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import Modal from './Modal';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: ' 10px',
  },
}));

export default function ProfileModal({ data, setData, sendData }) {
  const classes = useStyles();
  // This method sets all the date that came from input to null which is falsy and if data if falsy our modal closes
  const handleClose = () => {
    setData(null);
  };
  // To make sure our question is adressed correct we check what we changing and asking accordigly
  let name =
    (data?.values?.firstName && 'name') ||
    (data?.values?.email && 'email') ||
    (data?.values?.oldPassword && 'password');

  return (
    // MUI modals takes two props "open" and onClose; onClose has reference to handleClose which sets data to null;
    <Modal open={data ? true : false} onClose={handleClose}>
      <Grid container direction='column' alignItems='center' justify='center'>
        <Grid item>
          <Typography component='h5' variant='h5'>
            {`Are you sure you want to change ${name}?`}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            onClick={() => sendData()}
            variant='contained'
            color='primary'
          >
            Yes
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              handleClose();
            }}
            variant='contained'
            color='secondary'
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}
