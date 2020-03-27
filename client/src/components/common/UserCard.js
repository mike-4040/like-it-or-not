import React from 'react';
import { Grid, makeStyles, Paper, Avatar, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  },
  paper: {
    padding: '20px',
    minHeight: theme.spacing(15),
    minWidth: theme.spacing(40)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  card: {
    height: '100%'
  },
  picture: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: `1px solid ${theme.palette.divider}`
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    transition: 'all .4s linear',

    '&:hover': {
      transform: 'scale(1.1)'
    }
  }
}));

export default function UserCard({ user }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper variant='outlined' square className={classes.paper}>
        <Grid container className={classes.card}>
          <Grid item xs={4} className={classes.picture}>
            <Avatar className={(classes.large, classes.row)}>
              <PersonIcon />
            </Avatar>
          </Grid>
          <Grid item xs={8} className={classes.content}>
            <Typography
              className={classes.row}
              component='p'
              variant='subtitle1'
            >
              First name : {user.firstName}
            </Typography>
            <Typography
              className={classes.row}
              component='p'
              variant='subtitle1'
            >
              Last name : {user.lastName}
            </Typography>
            <Typography
              className={classes.row}
              component='p'
              variant='subtitle1'
            >
              Email : {user.email}
            </Typography>
            <Typography
              className={classes.row}
              component='p'
              variant='subtitle1'
            >
              Phone : {user?.phone || 'none'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
