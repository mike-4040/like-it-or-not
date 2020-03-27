import React from 'react';
import TabPanel from './TabPanel';
import { Formik, Form } from 'formik';
import TableForm from './TableForm';

export default function ChangeEmail({ value, index, user }) {
  const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  let data = {
    text: ` Here you can change your password, please provide your old password, then provide new password and confirm it. Then press submit`,
    fields: [
      { name: 'oldPassword', label: 'Password', type: 'password' },
      { name: 'newPassword', label: 'New password', type: 'password' },
      {
        name: 'confirmPassword',
        label: 'Confirm new password',
        type: 'password'
      }
    ]
  };

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
