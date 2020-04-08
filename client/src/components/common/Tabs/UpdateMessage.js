import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginBottom: '5px',
  },
  succsses: {
    textAlign: 'center',
    color: 'green',
    marginTop: '10px',
    padding: '10px',
  },
  fail: {
    textAlign: 'center',
    color: 'red',
    marginTop: '10px',
    padding: '10px',
  },
}));

export default function UpdateMessage({ message }) {
  const classes = useStyles();
  let fail = message.includes('Opps! Something went wrong');

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={fail ? classes.fail : classes.succsses}
    >
      <Grid item className={classes.icon}>
        {fail ? (
          <ThumbDownAltOutlinedIcon color='secondary' />
        ) : (
          <ThumbUpAltOutlinedIcon color='primary' />
        )}
      </Grid>
      <Grid item>
        <Typography component='p' variant='subtitle1'>
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
}
