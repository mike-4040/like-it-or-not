import React, { useState } from 'react';
import { Grid, makeStyles, Paper, Avatar, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Modal from './Modals/Modal';
import UploadAvatar from './UploadAvatar';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '20px'
  },
  paper: {
    margin: '0 20px',
    padding: '20px'
  },
  picture: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: 'auto',
    cursor: 'pointer'
  },
  card: {
    height: '100%'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

export default function UserCard({ user }) {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className={classes.root}>
      <Modal open={openModal} onClose={handleClose}>
        <UploadAvatar handleClose={handleClose} />
      </Modal>
      <Paper elevation={3} square className={classes.paper}>
        <Grid container direction='row-reverse' className={classes.card}>
          <Grid item xs={4}>
            <Avatar
              className={classes.picture}
              src={user?.photo}
              onClick={() => setOpenModal(true)}
            >
              <PersonIcon />
            </Avatar>
          </Grid>
          <Grid item xs={8} className={classes.content}>
            <Typography component='p' variant='subtitle1'>
              First name : {user.firstName}
            </Typography>
            <Typography component='p' variant='subtitle1'>
              Last name : {user.lastName}
            </Typography>
            <Typography component='p' variant='subtitle1'>
              {user.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
