import React, { useState, useEffect } from 'react';
import TabPanel from './TabPanel';
import { Formik, Form } from 'formik';
import TableForm from './TableForm';
import Api from '../../../utils/api';

const initialState = {
  firstName: 'kostas',
  lastName: 'Agapov'
};

let data = {
  text: ` Here you can change your name, please provide your new first name or last name, then press submit`,
  fields: [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' }
  ]
};

export default function ChangeName({ value, index }) {
  useEffect(() => {});

  const handleSubmit = async (values, { setErrors }) => {
    console.log('values', values);
  };

  return (
    <TabPanel value={value} index={index}>
      <Formik
        // validationSchema={signUpValidationSchema}
        initialValues={initialState}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <TableForm errors={errors} touched={touched} data={data} />
          </Form>
        )}
      </Formik>
    </TabPanel>
  );
}
