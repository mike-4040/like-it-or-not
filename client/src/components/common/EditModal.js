import React, { useContext } from 'react';
import Modal from './Modal';
import FormInputs from './FormInputs';
import { Grid, Button } from '@material-ui/core';
import { AppContext } from '../../Context';

export default function EditModal() {
  const {
    openEdit,
    handleCloseEdit,
    editedRecord,
    records,
    setEditedRecord,
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

  return (
    <Modal open={openEdit} onClose={handleCloseEdit}>
      <form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <FormInputs setValues={setEditedValues} {...editedRecord} />
        <Grid container justify='space-between'>
          <Button type='submit' variant='contained' color='primary'>
            Edit Memory
          </Button>
          <Button
            onClick={handleCloseEdit}
            variant='contained'
            color='secondary'
          >
            Backto List
          </Button>
        </Grid>
      </form>
    </Modal>
  );
}
