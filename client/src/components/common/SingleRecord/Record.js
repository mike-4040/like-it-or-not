import React from 'react';
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ManageRecordIcons from './ManageRecordIcons';

const useStyles = makeStyles(theme => ({
  card: {
    padding: '20px',
    height: '350px',
    margin: '5px',
    background: 'rgba(0,0,0,0.011)',
    position: 'relative'
  },
  time: {
    marginTop: 'auto'
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
      <Paper square className={classes.card}>
        <Grid container direction='column' style={{ height: '100%' }}>
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
            <Typography component='p' variant='subtitle1' align='center'>
              {catName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component='h1' variant='h6'>
              {subject}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              component='p'
              variant='body1'
              style={{ margin: '5px 0' }}
            >
              {comment}
            </Typography>
          </Grid>
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
