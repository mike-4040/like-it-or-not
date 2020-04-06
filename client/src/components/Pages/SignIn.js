import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  Link,
  Grid,
  Typography,
  Container,
  CssBaseline,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { logInValidationSchema } from '../common/Validation';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const initialState = { email: '', password: '' };

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const { setUser } = useContext(AppContext);

  const handleSubmit = async (values, { setErrors }) => {
    try {
      await Auth.signin(values);
      // getting id from token in localstorage
      const { id } = Auth.getProfile();
      //sending another request for user info
      const { data: user } = await Api.getUser(id);
      setUser(user);
      //Redirecting to main page after setting user
      history.push('/main');
    } catch ({ response }) {
      //showing errors on fields and in console
      console.log('err.response.data.error: ', response.data);
      setErrors({ email: response.data.message });
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
        <Link
          className={classes.link}
          href={`${process.env.REACT_APP_SERVER_API_URL || 'api'}/auth/google`}
        >
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            startIcon={<ExitToAppIcon />}
          >
            Log In with Google
          </Button>
        </Link>
      </div>
    </Container>
  );
}
