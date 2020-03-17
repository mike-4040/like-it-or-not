import React, { useContext } from 'react';
import { Grid, Typography, DialogActions, Button } from '@material-ui/core';
import Modal from './Modal';
import Api from '../../../utils/api';
import { AppContext } from '../../../Context';

export default function DeleteModal() {
  const { openDelete, setOpenDelete, editedRecord, setRecords } = useContext(
    AppContext
  );

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    try {
      const { data } = await Api.deleteRecord(editedRecord._id);
      if (data) {
        setRecords(records => {
          return records.filter(el => el._id !== editedRecord._id);
        });
        handleCloseDelete();
      }
    } catch (err) {
      console.log('err', err);
    }
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
