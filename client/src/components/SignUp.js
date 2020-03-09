import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  TextField,
  Link,
  Grid,
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Container,
  makeStyles
} from '@material-ui/core';
import useForm from './costumHooks/useForm';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const initialState = { firstName: '', lastName: '', email: '', password: '' };

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues, reset] = useForm(initialState);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('user', values);
    reset(initialState);
    // let user = await axios.post('/register', { email, password,firstName,lastName});
    // if user created then redirect to new record page, otherwise show error
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddRoundedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Create an account
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                value={values.firstName}
                onChange={setValues}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                value={values.lastName}
                onChange={setValues}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={values.email}
                onChange={setValues}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={values.password}
                onChange={setValues}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Launch rockets
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/signin' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
