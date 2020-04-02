import React, { useState } from 'react';
import TabPanel from './TabPanel';
import { Formik, Form } from 'formik';
import TableForm from './TableForm';
import Api from '../../../utils/api';
import { changeNameValidationSchema } from '../Validation';
import Modal from '../Modals/Modal';

let initialFields = {
  text: ` Here you can change your name, please provide your new first name or last name, then press submit`,
  fields: [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' }
  ]
};

export default function ChangeName({ value, index, user, setUser }) {
  const initialState = {
    // firstName: user.firstName,
    // lastName: user.lastName
    firstName: '',
    lastName: ''
  };

  const [newName, setNewName] = useState();
  let [data, setData] = useState(initialFields);

  const handleSubmit = (values, { setErrors, resetForm }) => {
    setNewName({ values, setErrors, resetForm });
  };

  const sendData = async () => {
    newName.values.id = user.id;
    try {
      const { data } = await Api.updateUser(newName.values);
      setUser(data);
      setData(data => {
        return {
          ...data,
          message: 'Hurray! You have changed your name successfully'
        };
      });
      newName.resetForm();
      handleClose();
    } catch ({ response }) {
      if (response && response.status === 400) {
        console.log('err.response.data.error: ', response.data.error);
      }
      handleClose();
      newName.setErrors({
        firstName: 'Can not change name, please try again later'
      });
      setData(data => {
        return {
          ...data,
          message: 'Opps! Something went wrong, name is not changed'
        };
      });
      console.log('err', response);
    }
  };

  const handleClose = () => {
    setNewName(null);
  };

  return (
    <>
      <Modal open={newName ? true : false} onClose={handleClose}>
        Are you sure you want to change user name?
        <button
          onClick={() => {
            sendData();
          }}
        >
          yes
        </button>
        <button
          onClick={() => {
            handleClose();
          }}
        >
          No
        </button>
      </Modal>
      <TabPanel value={value} index={index}>
        <Formik
          validationSchema={changeNameValidationSchema}
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
    </>
  );
}
