import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Grid,
  Link,
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
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

export default function User() {
  const classes = useStyles();
  let history = useHistory();

  let { user, setUser, setRecords } = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setUser(null);
    setRecords(null);
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
          <Typography variant='button'>{user.firstName}</Typography>
        </Grid>
        <Grid item className={classes.user}>
          <IconButton
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <Avatar className={classes.avatar} src={user?.photo}>
              <PersonIcon />
            </Avatar>
          </IconButton>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <Link component={RouterLink} to='/main' className={classes.link}>
              <MenuItem>{'Main'}</MenuItem>
            </Link>
            <Link component={RouterLink} to='/profile' className={classes.link}>
              <MenuItem>{'Profile'}</MenuItem>
            </Link>
            {user.role === 'admin' && (
              <Link component={RouterLink} to='/admin' className={classes.link}>
                <MenuItem>{'Admin dashboard'}</MenuItem>
              </Link>
            )}
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </>
  );
}
