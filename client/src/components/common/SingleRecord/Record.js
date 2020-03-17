import React from 'react';
import { makeStyles, ExpansionPanel } from '@material-ui/core';

import RecordPannelHeadings from './RecordPannelHeadings';
import RecordPannelComment from './RecordPannelComment';

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      background: 'rgba(0,0,0,0.014)'
    },
    '&::before ': {
      background: 'none'
    },
    transition: 'all .1s linear',
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    boxShadow: 'none',
    margin: '7px 0',
    '&:first-child ': {
      margin: '0 0 7px'
    },
    '&:last-child ': {
      marginBottom: '7px'
    }
  },
  heading: {
    justifyContent: 'space-between'
  }
}));

export default function Record({
  _id,
  subject,
  comment,
  dateTime,
  rating,
  catName
}) {
  const classes = useStyles();

  return (
    <>
      <ExpansionPanel className={classes.root}>
        <RecordPannelHeadings
          subject={subject}
          rating={rating}
          catName={catName}
        />
        <RecordPannelComment
          comment={comment}
          dateTime={dateTime}
          recordId={_id}
        />
      </ExpansionPanel>
    </>
  );
}
