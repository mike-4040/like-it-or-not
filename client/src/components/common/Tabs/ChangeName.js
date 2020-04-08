import React, { useState } from 'react';
import { Formik, Form } from 'formik';

import TabPanel from './TabPanel';
import TableForm from './TableForm';
import ProfileModal from '../Modals/ProfileModal';

import Api from '../../../utils/api';
import { changeNameValidationSchema } from '../Validation';

export default function ChangeName({ value, index, user, setUser }) {
  // Initial Input fields and State
  let initialFields = {
    text: ` Here you can change your name, please provide your new First and Last Names, then press submit`,
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text' }
    ]
  };
  const initialState = {
    firstName: '',
    lastName: ''
  };

  // Putting initial in state to update UI on change
  let [fields, setFields] = useState(initialFields);
  // All input and methods from formik will be passed to state to have access after confirm on modal
  const [newInput, setNewInput] = useState();
  // Method passes values from formik to our state, all values and methods can be reached vie newInput object
  const handleSubmit = (values, { setErrors, resetForm }) => {
    setNewInput({ values, setErrors, resetForm });
  };
  // On succsses or fail to update we will add custom message on screen to inform user
  const setMessage = message =>
    setFields(data => ({
      ...data,
      message
    }));
  //On confirm we trigger this method which is forming final validated objec and send it to DB
  const sendData = async () => {
    let input = {
      firstName: newInput.values.firstName,
      lastName: newInput.values.lastName,
      id: user.id
    };
    setNewInput(null);

    try {
      const { data } = await Api.updateUser(input);
      if (data && data.errmsg) {
        newInput.setErrors({
          firstName: data.errmsg
        });
        setMessage(null);
        return;
      }
      setUser(data);
      setMessage('Hurray! You have changed your name successfully');
      // Cleaning state and form on success
      newInput.resetForm();
    } catch ({ response }) {
      console.log('err.response.data.error: ', response.data.error);
      // Cleanin input and setting error messages on field and screen
      /** @todo I think it's a duplicate and should be removed */
      newInput.setErrors({
        firstName: 'Can not change name, please try again later'
      });
      setMessage('Opps! Something went wrong, name is not changed');
    }
  };

  return (
    <>
      {/* Modal; passing inputs, method to clean inputs and reference to trigger sending to DB*/}
      <ProfileModal data={newInput} setData={setNewInput} sendData={sendData} />
      {/* Modal */}
      <TabPanel value={value} index={index}>
        <Formik
          // Validation from YUP
          validationSchema={changeNameValidationSchema}
          // Initial values naming must match input fields names
          initialValues={initialState}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <TableForm errors={errors} touched={touched} data={fields} />
            </Form>
          )}
        </Formik>
      </TabPanel>
    </>
  );
}
