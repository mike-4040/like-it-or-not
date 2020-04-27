import React from 'react';
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ManageRecordIcons from './ManageRecordIcons';

const useStyles = makeStyles(theme => ({
  card: {
    padding: '20px',
    minHeight: '350px',
    background: 'rgba(0,0,0,0.011)'
  },
  time: { marginTop: 'auto' }
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
      <Paper elevation={1} style={{ margin: '5px' }}>
        <Grid container direction='column' className={classes.card}>
          <Grid
            item
            container
            justify='space-between'
            alignItems='center'
            style={{ marginBottom: '5px' }}
          >
            <Rating
              name='size-small'
              size='small'
              value={Number(rating)}
              readOnly
            />
            <Typography component='p' variant='subtitle1'>
              {catName}
            </Typography>
          </Grid>
          {/* main text and heading */}
          <Grid
            item
            container
            direction='column'
            spacing={2}
            style={{ overflowWrap: ' break-word', wordWrap: 'break-word' }}
          >
            <Grid item xs={12}>
              <Typography component='h1' variant='h6'>
                {subject}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component='p' variant='body1'>
                {comment}
              </Typography>
            </Grid>
          </Grid>
          {/* Footer */}
          <Grid
            item
            container
            justify='space-between'
            alignItems='baseline'
            className={classes.time}
          >
            <Grid item>
              <Typography component='p' variant='caption'>
                {new Date(dateTime).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item>
              <ManageRecordIcons recordId={_id} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
