import React, { useContext, useState } from 'react';
import {
  Avatar,
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
// import FaceIcon from '@material-ui/icons/Face';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { AppContext } from '../../Context';

import AuthService from '../../utils/AuthService';

const Auth = new AuthService();

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: '5px',
    backgroundColor: theme.palette.secondary.main
  },
  user: {
    marginRight: '5%'
  }
}));

export default function User() {
  const classes = useStyles();
  let history = useHistory();

  const { user, setUser } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    Auth.logout();
    history.push('/');
  };

  return (
    <>
      <Grid
        container
        justify='flex-end'
        alignItems='center'
        className={classes.nav}
      >
        <Grid item>
          <Typography variant='body1'>{user.name}</Typography>
        </Grid>
        <Grid item className={classes.user}>
          <Avatar className={classes.avatar}>
            <IconButton
              aria-controls='simple-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              <PersonIcon />
            </IconButton>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Avatar>
        </Grid>
      </Grid>
    </>
  );
}
