import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context';
import { Link as RouterLink } from 'react-router-dom';
import { CssBaseline, Container, makeStyles, Button } from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Tooltip from '@material-ui/core/Tooltip';

import UserTop from '../common/User';
import SearchBar from '../common/SearchBar';
import Table from '../common/RecordsTable/Table';
import ModalComponents from '../common/Modals/ModalComponents';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  addRecord: {
    position: 'fixed',
    bottom: '30px',
    right: '0px',
    width: '100px',
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      top: '10px',
      left: '0px',
      borderTopLeftRadius: '0%',
      width: '50px',
      height: '50px'
    }
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
      let time = new Date(el.dateTime).setHours(0, 0, 0, 0);
      let start = startDate.setHours(0, 0, 0, 0);
      return start <= time;
    });
  }
  if (endDate) {
    records = records.filter(el => {
      let time = new Date(el.dateTime).setHours(0, 0, 0, 0);
      let end = endDate.setHours(0, 0, 0, 0);
      return end >= time;
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

        <div>
          <Tooltip title='Create new record' placement='top'>
            <Button
              className={classes.addRecord}
              variant='contained'
              component={RouterLink}
              to='/record'
            >
              <AddCircleOutlineRoundedIcon fontSize='large' color='primary' />
            </Button>
          </Tooltip>
        </div>
      </Container>
      {/* Modals */}
      <ModalComponents />
    </div>
  );
}
