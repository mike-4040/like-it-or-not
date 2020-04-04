import React, { useState } from 'react';
import TabPanel from './TabPanel';
import { Formik, Form } from 'formik';
import TableForm from './TableForm';
import ProfileModal from '../Modals/ProfileModal';
import { changeEmailValidationSchema } from '../Validation';
import Api from '../../../utils/api';

export default function ChangeEmail({ value, index, user }) {
  // Initial Input fields and State
  const initialState = {
    email: '',
    newEmail: '',
    confirmEmail: '',
  };
  let initialFields = {
    text: ` Here you can change your email, please provide your new email and confirm it, then press submit`,
    fields: [
      { name: 'email', label: 'Current email', type: 'email' },
      { name: 'newEmail', label: 'New email', type: 'email' },
      { name: 'confirmEmail', label: 'Confirm email', type: 'email' },
    ],
  };

  // Putting initial in state to update UI on change
  const [fields, setFields] = useState(initialFields);
  // All input and methods from formik will be passed to state to have access after confirm on modal
  const [newInput, setNewInput] = useState();
  // Method passes values from formik to our state, all values and methods can be reached vie newInput object
  const handleSubmit = (values, { setErrors, resetForm }) => {
    setNewInput({ values, setErrors, resetForm });
  };
  // On succsses or fail to update we will add custom message on screen to inform user
  const setMessage = (message) => {
    setFields((data) => {
      return {
        ...data,
        message,
      };
    });
  };
  //On confirm we trigger this method which is forming final validated objec and send it to DB
  const sendData = async () => {
    newInput.values.id = user.id;
    delete newInput.values.confirmEmail;
    // As we agreed earlier in order to update email, user has to provide old email.
    // Check this log, it has old email and new email, we need to validate old email before updating
    console.log('object', newInput.values);
    try {
      // Sending Inputs to DB, if response has error key then we will show error and exit procces.
      const { data } = await Api.updateUser(newInput.values);
      if (data.error) {
        return newInput.setErrors({
          oldPassword: 'Email does not match' || data.error,
        });
      }
      setMessage('Hurray! You have changed your email successfully');
      // Cleaning state and form on success
      newInput.resetForm();
      setNewInput(null);
    } catch ({ response }) {
      console.log('err.response.data.error: ', response.data.error);
      // Cleanin input and setting error messages on field and screen
      setNewInput(null);
      newInput.setErrors({
        email: 'Can not change email, please try again later',
      });
      setMessage('Opps! Something went wrong, email is not changed');
      console.log('err', response);
    }
  };

  return (
    <>
      {/* Modal;  passing inputs, method to clean inputs and reference to trigger sending to DB*/}
      <ProfileModal data={newInput} setData={setNewInput} sendData={sendData} />
      {/* Modal */}

      <TabPanel value={value} index={index}>
        <Formik
          validationSchema={changeEmailValidationSchema}
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
