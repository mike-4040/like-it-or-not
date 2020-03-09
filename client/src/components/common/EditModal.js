import React, { useContext } from 'react';
import Modal from './Modal';
import FormInputs from './FormInputs';
import { Grid, Button, Typography } from '@material-ui/core';
import { AppContext } from '../../Context';

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

  const handleSubmit = e => {
    e.preventDefault();
    let index = records.findIndex(el => el.userId === editedRecord.userId);
    records[index] = editedRecord;
    setRecords(records);
    handleCloseEdit();
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <Modal open={openEdit} onClose={handleCloseEdit}>
      <form onSubmit={handleSubmit}>
        <FormInputs setValues={setEditedValues} {...editedRecord} />
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
