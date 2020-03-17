import React, { useContext } from 'react';
import Modal from './Modal';
import RecordFormInputs from '../inputElements/RecordFormInputs';
import { Grid, Button, Typography } from '@material-ui/core';
import { AppContext } from '../../../Context';
import Api from '../../../utils/api';

export default function EditModal() {
  const {
    openEdit,
    setOpenEdit,
    setEditedRecord,
    editedRecord,
    records,
    setRecords
  } = useContext(AppContext);

  const setEditedValues = e => {
    setEditedRecord({
      ...editedRecord,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    editedRecord.dateTime = Date.now();
    try {
      const { data } = await Api.editRecord(editedRecord);
      if (data) {
        let index = records.findIndex(el => el._id === editedRecord._id);
        records[index] = data;
        setRecords(records);
        handleCloseEdit();
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <Modal open={openEdit} onClose={handleCloseEdit}>
      <form onSubmit={handleSubmit}>
        <RecordFormInputs setValues={setEditedValues} {...editedRecord} />
        <Grid container justify='space-between' spacing={1}>
          <Grid item xs={12} sm={5}>
            <Button fullWidth type='submit' variant='contained' color='primary'>
              <Typography component='p' variant='button'>
                Edit Memory
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Button
              fullWidth
              onClick={handleCloseEdit}
              variant='contained'
              color='secondary'
            >
              <Typography component='p' variant='button'>
                Back to List
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
}
