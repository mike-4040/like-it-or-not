import React, { useContext } from 'react';
import { Grid, Typography, DialogActions, Button } from '@material-ui/core';
import { AppContext } from '../../Context';

export default function DeleteRecord() {
  const { editedRecord, setRecords, handleCloseDelete } = useContext(
    AppContext
  );

  const handleDelete = () => {
    setRecords(records => {
      return records.filter(el => el.userId !== editedRecord.userId);
    });
    handleCloseDelete();
  };

  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Grid item>
        <Typography component='h5' variant='h5'>
          Are you sure you want to delete this record?
        </Typography>
      </Grid>
      <DialogActions>
        <Button onClick={handleDelete} variant='contained' color='primary'>
          Yes
        </Button>
        <Button
          onClick={handleCloseDelete}
          variant='contained'
          color='secondary'
        >
          No
        </Button>
      </DialogActions>
    </Grid>
  );
}
