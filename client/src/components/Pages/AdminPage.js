import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Paper,
  Container,
  CssBaseline
} from '@material-ui/core';
import User from '../common/User';

import AdminCategoriesTable from '../common/AdminElements/AdminCategoriesTable';
const useStyles = makeStyles(theme => ({
  mainBox: {
    marginTop: '2rem',
    height: 'auto'
  },
  paper: {
    padding: theme.spacing(4),
    height: '100%'
  }
}));

export default function AdminMockup() {
  const classes = useStyles();

  return (
    <>
      <User />
      <Container>
        <CssBaseline />
        <Grid container spacing={2} className={classes.mainBox}>
          <Grid item xs={12} sm={6}>
            <AdminCategoriesTable />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Typography variant='h6' component='h3' align='center'>
                Users
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
