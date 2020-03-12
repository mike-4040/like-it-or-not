import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import { Formik, Form } from 'formik';
import { logInValidationSchema } from '../common/Validation';
import Api from '../../utils/api';
import FormikFieldInput from '../common/inputElements/FormikFieldInput';

import AuthService from '../../utils/AuthService';

const Auth = new AuthService();

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

const initialState = { email: '', password: '' };

export default function SignIn(props) {
  const classes = useStyles();

  const handleSubmit = async (values, { resetForm, setErrors }) => {
    console.log('values', values);
    try {
      const { data } = await Auth.signin(values);
      if (data) {
        console.log('data', data);
      }
      //     resetForm();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log('err.response.data', err.response.data);
        setErrors({ email: 'Such Email does not exist' });
      }
    }
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
        {/* FORMIK START */}
        <Formik
          validationSchema={logInValidationSchema}
          initialValues={initialState}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <FormikFieldInput
                errors={errors}
                touched={touched}
                name='email'
                label='Email Address'
                margin='normal'
              />
              <FormikFieldInput
                margin='normal'
                errors={errors}
                touched={touched}
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
                  <Link component={RouterLink} to='/signup' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
