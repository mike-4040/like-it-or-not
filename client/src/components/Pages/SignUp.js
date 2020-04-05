import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  Link,
  Grid,
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import { Formik, Form } from 'formik';
import { signUpValidationSchema } from '../common/Validation';
import FormikFieldInput from '../common/inputElements/FormikFieldInput';
import { AppContext } from '../../Context';
import AuthService from '../../utils/AuthService';
import Api from '../../utils/api';

const Auth = new AuthService();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = { firstName: '', lastName: '', email: '', password: '' };

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const { setUser } = useContext(AppContext);

  const handleSubmit = async (values, { setErrors }) => {
    try {
      await Auth.signup(values);
      // getting id from token in localstorage
      const { id } = Auth.getProfile();
      //sending another request for user info
      const { data: user } = await Api.getUser(id);
      setUser(user);
      //Redirecting to main page after setting user
      history.push('/main');
    } catch ({ response }) {
      //showing errors on fields and in console
      console.log('err.response.data.error: ', response.data.error);
      setErrors({ email: response.data.message });
    }
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
        {/* FORMIK START */}
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={initialState}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormikFieldInput
                    errors={errors}
                    touched={touched}
                    name='firstName'
                    label='First Name'
                    autoFocus={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikFieldInput
                    errors={errors}
                    touched={touched}
                    name='lastName'
                    label='Last Name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikFieldInput
                    errors={errors}
                    touched={touched}
                    name='email'
                    label='Email Address'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikFieldInput
                    errors={errors}
                    touched={touched}
                    name='password'
                    label='Password'
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
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
