import React from 'react';
import { Grid, makeStyles, Paper, Avatar, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

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
    margin: 'auto'
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

  return (
    <div className={classes.root}>
      <Paper elevation={3} square className={classes.paper}>
        <Grid container direction='row-reverse' className={classes.card}>
          <Grid item xs={4}>
            <Avatar className={classes.picture} src={user?.photo}>
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
