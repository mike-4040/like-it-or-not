import React from 'react';
import { Avatar, Grid, Typography, IconButton } from '@material-ui/core';
// import FaceIcon from '@material-ui/icons/Face';
import PersonIcon from '@material-ui/icons/Person';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: '5px',
    backgroundColor: theme.palette.secondary.main
  },
  nav: {
    position: 'absolute',
    top: '0',
    right: '0'
  },
  user: {
    marginRight: '5%'
  }
}));

export default function User() {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        justify='flex-end'
        alignItems='center'
        className={classes.nav}
      >
        <Grid item>
          <Typography variant='body1'>UserName</Typography>
        </Grid>
        <Grid item className={classes.user}>
          <Avatar className={classes.avatar}>
            <IconButton>
              <PersonIcon />
            </IconButton>
          </Avatar>
        </Grid>
      </Grid>
    </>
  );
}
