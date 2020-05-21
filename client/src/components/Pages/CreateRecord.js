import React from 'react';
import {
  Typography,
  Grid,
  CssBaseline,
  Container,
  makeStyles
} from '@material-ui/core';

import UserTop from '../common/User';
import CreateRecordForm from '../common/CreateRecordForm';

const useStyles = makeStyles({
  section: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '5%'
  }
});

export default function CreateRecord() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <UserTop />
      <Container component='main' maxWidth='xs'>
        <Grid container className={classes.section}>
          <Typography component='h1' variant='h4'>
            Like it or not
          </Typography>
          <CreateRecordForm />
        </Grid>
      </Container>
    </>
  );
}
