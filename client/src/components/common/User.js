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
              <MenuItem>
                <Link
                  component={RouterLink}
                  to='/main'
                  className={classes.link}
                >
                  {'Main'}
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  component={RouterLink}
                  to='/profile'
                  className={classes.link}
                >
                  {'Profile'}
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  component={RouterLink}
                  to='/admin'
                  className={classes.link}
                >
                  {'Admin dashboard'}
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Avatar>
        </Grid>
      </Grid>
    </>
  );
}
