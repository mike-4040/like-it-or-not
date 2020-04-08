import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, CssBaseline } from '@material-ui/core';
import User from '../common/User';

import AdminCategoriesTable from '../common/AdminElements/AdminCategoriesTable';
import AdminUserTable from '../common/AdminElements/AdminUserTable';

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
        <Grid
          container
          alignItems='stretch'
          spacing={2}
          className={classes.mainBox}
        >
          <Grid item xs={12} md={6}>
            <AdminCategoriesTable />
          </Grid>
          <Grid item xs={12} md={6}>
            <AdminUserTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
