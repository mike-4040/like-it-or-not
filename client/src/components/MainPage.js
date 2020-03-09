import React from 'react';
import { CssBaseline, Container, makeStyles } from '@material-ui/core';

import UserTop from './common/User';
import SearchBar from './common/SearchBar';
import Table from './common/Table';
import ModalComponents from './common/ModalComponents';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  }
}));

export default function MainPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <UserTop />
      <Container component='main' maxWidth='md'>
        <SearchBar />
        <Table />
      </Container>
      {/* Modals */}
      <ModalComponents />
    </div>
  );
}
