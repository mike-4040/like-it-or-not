import React, { useContext } from 'react';
import { Grid, Typography, DialogActions, Button } from '@material-ui/core';
import Modal from './Modal';

import { AppContext } from '../../../Context';

export default function DeleteModal() {
  const { openDelete, setOpenDelete, editedRecord, setRecords } = useContext(
    AppContext
  );

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    setRecords(records => {
      return records.filter(el => el.userId !== editedRecord.userId);
    });
    handleCloseDelete();
  };

  return (
    <Modal open={openDelete} onClose={handleCloseDelete}>
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
    </Modal>
  );
}
