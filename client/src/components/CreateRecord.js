import React from 'react';
import {
  Typography,
  Grid,
  CssBaseline,
  Container,
  makeStyles
} from '@material-ui/core';

import UserTop from './common/User';
import Form from './common/Form';

const useStyles = makeStyles(theme => ({
  section: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20%'
  }
}));

export default function CreateRecord() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <UserTop />
      <Container component='main' maxWidth='xs'>
        <Grid container className={classes.section}>
          <Typography component='h1' variant='h4' mb='2'>
            Like it or not
          </Typography>
          <Form />
        </Grid>
      </Container>
    </>
  );
}
