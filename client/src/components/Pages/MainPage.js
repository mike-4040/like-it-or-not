import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context';
import { Link as RouterLink } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  makeStyles,
  Grid,
  IconButton
} from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

import UserTop from '../common/User';
import SearchBar from '../common/SearchBar';
import Table from '../common/Table';
import ModalComponents from '../common/Modals/ModalComponents';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  }
}));

export default function MainPage() {
  const classes = useStyles();
  let { records, setRecords } = useContext(AppContext);
  // Searches States
  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  // filtering by seachtext
  if (searchText) {
    records = records.filter(el =>
      el.subject.toLowerCase().includes(searchText)
    );
  }
  // filtering by seach category
  if (searchCategory) {
    records = records.filter(el => el.categoryId === searchCategory);
  }
  // filtering by dates
  if (startDate) {
    records = records.filter(el => {
      let time = new Date(el.dateTime);
      return startDate <= time;
    });
  }
  if (endDate) {
    records = records.filter(el => {
      let time = new Date(el.dateTime);
      console.log('endDate', endDate);
      console.log('time', time);
      return endDate >= time;
    });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <UserTop />
      <Container component='main' maxWidth='md'>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <Table records={records} setRecords={setRecords} />
        <Grid container justify='center' styles={{ marginTop: '10px' }}>
          <Grid item>
            <IconButton
              color='primary'
              size='large'
              component={RouterLink}
              to='/record'
            >
              <AddCircleOutlineRoundedIcon fontSize='large' />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
      {/* Modals */}
      <ModalComponents />
    </div>
  );
}
