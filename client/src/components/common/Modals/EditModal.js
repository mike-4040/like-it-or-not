import React, { useContext } from 'react';
import Modal from './Modal';
import { Grid, Button } from '@material-ui/core';
import { AppContext } from '../../../Context';
import Api from '../../../utils/api';
import { Formik, Form } from 'formik';
import FormikRecordForm from '../inputElements/FormikRecordForm';
import { recordFormValidationSchema } from '../Validation';

export default function EditModal() {
  let {
    openEdit,
    setOpenEdit,
    setEditedRecord,
    editedRecord,
    records,
    setRecords
  } = useContext(AppContext);

  const handleSubmit = async (values, { setErrors }) => {
    values.dateTime = Date.now();
    delete values.catName;
    try {
      const { data } = await Api.editRecord(values);
      if (data) {
        let index = records.findIndex(el => el._id === values._id);
        records[index] = data;
        setRecords(records);
        handleCloseEdit();
      }
    } catch ({ response }) {
      console.log('response.data.error: ', response.data.error);
      setErrors({ subject: response.data.message });
    }
  };
  const handleCloseEdit = () => {
    setEditedRecord(null);
    setOpenEdit(false);
  };

  return (
    <Modal open={openEdit} onClose={handleCloseEdit}>
      <Formik
        validationSchema={recordFormValidationSchema}
        initialValues={editedRecord}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form style={{ width: '100%' }}>
            <FormikRecordForm errors={errors} touched={touched} />
            <Grid container justify='space-between'>
              <Grid item xs={12} sm={5}>
                <Button
                  fullWidth
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Edit Memory
                </Button>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Button
                  fullWidth
                  onClick={handleCloseEdit}
                  variant='contained'
                  color='secondary'
                >
                  Back to List
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
