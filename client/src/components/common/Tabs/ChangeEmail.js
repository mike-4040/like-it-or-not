import React, { useState } from 'react';
import TabPanel from './TabPanel';
import { Formik, Form } from 'formik';
import TableForm from './TableForm';
import ProfileModal from '../Modals/ProfileModal';
import { changeEmailValidationSchema } from '../Validation';
import Api from '../../../utils/api';

export default function ChangeEmail({ value, index, user, setUser }) {
  // Initial Input fields and State
  let initialFields = {
    text: ` Here you can change your email, please provide your new email and confirm it, then press submit`,
    fields: [
      { name: 'email', label: 'New email', type: 'email' },
      { name: 'confirmEmail', label: 'Confirm email', type: 'email' }
    ]
  };
  const initialState = {
    email: '',
    confirmEmail: ''
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
  const setMessage = message => {
    setFields(data => {
      return {
        ...data,
        message
      };
    });
  };
  //On confirm we trigger this method which is forming final validated objec and send it to DB

  const sendData = async () => {
    let input = { email: newInput.values.email, id: user.id };
    setNewInput(null);

    try {
      const { data } = await Api.updateUser(input);
      if (data && data.errmsg) {
        newInput.setErrors({
          email: data.errmsg
        });
        setMessage(null);
        return;
      }
      setUser(data);
      setMessage('Hurray! You have changed your email successfully');
      // Cleaning state and form on success
      newInput.resetForm();
    } catch ({ response }) {
      console.log('err.response.data.error: ', response.data.error);
      // Cleanin input and setting error messages on field and screen
      setMessage('Opps! Something went wrong, email is not changed');
    }
  };
  // const sendData = async () => {
  //   let input = { email: newInput.values.email, id: user.id };
  //   // Check this log
  //   console.log('object', input);
  //   try {
  //     // Sending Inputs to DB
  //     const { data } = await Api.updateUser(input);
  //     console.log('data', data);
  //     setUser(data);
  //     setMessage('Hurray! You have changed your email successfully');
  //     // Cleaning state and form on success
  //     newInput.resetForm();
  //     setNewInput(null);
  //   } catch ({ response }) {
  //     // Cleanin input and setting error messages on field and screen
  //     setNewInput(null);
  //     newInput.setErrors({
  //       email: 'Can not change email, please try again later'
  //     });
  //     setMessage('Opps! Something went wrong, email is not changed');
  //     console.log('err', response);
  //   }
  // };

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
