import React from 'react';
import { makeStyles } from '@material-ui/core';
import Record from './Record.js';

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

const dummyRecords = [
  {
    id: '1',
    name: 'Coffee at "La Crema"',
    category: 'Restaurant',
    time: '3/3/2020 11:46 pm',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    rating: 2
  },
  {
    id: '2',
    name: 'Coffee at "Ferrari"',
    category: 'Food',
    time: '3/3/2020 11:46 pm',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    rating: 1
  },
  {
    id: '3',
    name: 'Coffee at "Home"',
    category: 'Drink',
    time: '3/3/2020 11:46 pm',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    rating: 3
  },
  {
    id: '4',
    name: 'Coffee at "Starbucks"',
    category: 'Food',
    time: '3/3/2020 11:46 pm',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    rating: 1
  },
  {
    id: '5',
    name: 'Coffee at "Viena"',
    category: 'Food',
    time: '3/3/2020 11:46 pm',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    rating: 5
  },
  {
    id: '6',
    name: 'Coffee at "Marakesh"',
    category: 'Food',
    time: '3/3/2020 11:46 pm',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    rating: 5
  },
  {
    id: '7',
    name: 'Coffee at "Marakesh"',
    category: 'Food',
    time: '3/3/2020 11:46 pm',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    rating: 3
  },
  {
    id: '8',
    name: 'Coffee at "Marakesh"',
    category: 'Food',
    time: '3/3/2020 11:46 pm',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    rating: 4
  }
];

export default function SimpleExpansionPanel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {dummyRecords.map(record => {
        return <Record key={record.id} {...record} />;
      })}
    </div>
  );
}
