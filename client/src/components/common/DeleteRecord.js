import React from 'react';
import { Grid, Typography, DialogActions, Button } from '@material-ui/core';

export default function DeleteRecord() {
  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Grid item>
        <Typography component='h6' variant='h6'>
          Are you sure you want to delete this record?
        </Typography>
      </Grid>
      <DialogActions>
        <Button variant='contained' color='primary'>
          Yes
        </Button>
        <Button variant='contained' color='secondary'>
          No
        </Button>
      </DialogActions>
    </Grid>
  );
}
