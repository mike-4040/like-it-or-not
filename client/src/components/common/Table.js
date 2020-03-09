import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import Record from './Record.js';
import { AppContext } from '../../Context';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '3%',
    maxHeight: '350px',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.1)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.0)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  }
}));

export default function SimpleExpansionPanel() {
  const classes = useStyles();
  // FILTERING RECORDS
  let {
    records,
    setRecords,
    searchText,
    searchCategory,
    startDate,
    endDate
  } = useContext(AppContext);
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
      {records &&
        records.map(record => {
          return (
            <Record key={record.userId} {...record} setRecords={setRecords} />
          );
        })}
    </div>
  );
}
