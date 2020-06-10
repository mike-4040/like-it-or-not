import React, { useContext, useState } from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Api from '../../utils/api';
import { AppContext } from '../../Context';

import { Formik, Form } from 'formik';
import FormikRecordForm from '../common/inputElements/FormikRecordForm';
import { recordFormValidationSchema } from '../common/Validation';

import UppyWebCam from './UppyWebCam';

const initialState = {
  rating: 3,
  subject: '',
  categoryId: '',
  comment: ''
};

export default function RecordForm() {
  const [image, setImage] = useState();

  const { setRecords, user } = useContext(AppContext);
  let history = useHistory();

  const handleSubmit = async (values, { setErrors }) => {
    //sending file to cloud
    let file = {};
    try {
      if (image) {
        let data = new FormData();
        data.append('file', image.data);
        data.append('name', image.name);
        data.append('upload_preset', 'lionapp');
        // sending file to cloudinary
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/lionapp/image/upload/',
          { method: 'POST', body: data }
        );
        file = await res.json();
        setImage(null);
      }

      const newRecord = {
        userId: user.id,
        dateTime: Date.now(),
        imageUrl: file.secure_url ? file.secure_url : '',
        ...values
      };
      /** sending record to the backend */
      try {
        const { data } = await Api.createRecord(newRecord);
        if (data) {
          setRecords(records => (records ? [data, ...records] : [data]));
          history.push('/main');
        }
      } catch ({ response }) {
        console.log('response.data.error: ', response.data.error);
        setErrors({ subject: response.data.message });
      }
    } catch (e) {
      console.log('error saving picture: ', e);
      setErrors({ subject: `Can't save the picture` });
    }
  };

  return (
    <>
      <Formik
        validationSchema={recordFormValidationSchema}
        initialValues={initialState}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form style={{ width: '100%', position: 'relative' }}>
            <FormikRecordForm errors={errors} touched={touched} />
            <UppyWebCam setImage={setImage} />
            <Grid container justify='space-between'>
              <Button type='submit' variant='contained' color='primary'>
                Create memory
              </Button>
              <Button
                component={RouterLink}
                to='/main'
                variant='contained'
                color='secondary'
              >
                Continue
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>

      {image && (
        <Paper elevation={3} style={{ marginTop: '10px' }}>
          <img
            style={{ width: '100%', height: 'auto' }}
            src={image.preview}
            alt=''
          ></img>
        </Paper>
      )}
    </>
  );
}
