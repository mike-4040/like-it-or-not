import React, { useState } from 'react';
import axios from 'axios';
import TextInput from './common/TextInput';

import {
  Avatar,
  Button,
  Link,
  Grid,
  Typography,
  Container,
  CssBaseline
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('email,password', email, password);
    setEmail('');
    setPassword('');
    // let user = await axios.post('/user', { email, password });
    // if user exist then redirect to new record page, otherwise show error
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaceIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Welcome
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextInput
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            autoFocus
            required
            autoComplete='email'
            name='email'
            label='Email Address'
          />
          <TextInput
            type='password'
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            required
            autoComplete='current-password'
            name='password'
            label='Password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
