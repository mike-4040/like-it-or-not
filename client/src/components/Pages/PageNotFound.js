import React from 'react';
import {
  CssBaseline,
  Container,
  makeStyles,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(20)
  }
}));

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <Container component='main' maxWidth='md'>
        <Grid className={classes.root} container direction='column' spacing={1}>
          <Grid item>
            <Typography component='h2' variant='h2'>
              Page not found 404
            </Typography>
          </Grid>
          <Grid item>
            <Typography component='p' variant='h5'>
              We have been trying to find your page but it simply does not exist
            </Typography>
          </Grid>
          <Grid item>
            <Typography component='p' variant='h6'>
              Would you like to go back to home page?
            </Typography>
          </Grid>
          <Grid item>
            <Button size='large' color='primary' component={RouterLink} to='/'>
              Go back to where we started
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
