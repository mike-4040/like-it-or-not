import React, { useState } from 'react';
import TabPanel from './TabPanel';
import { Formik, Form } from 'formik';
import TableForm from './TableForm';
import ProfileModal from '../Modals/ProfileModal';
import { changePasswordValidationSchema } from '../Validation';
import Api from '../../../utils/api';

export default function ChangeEmail({ value, index, user }) {
  // Initial Input fields and State
  let initialState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  let initialFields = {
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
    let input = {
      oldPassword: newInput.values.oldPassword,
      newPassword: newInput.values.newPassword,
      id: user.id
    };
    setNewInput(null);
    try {
      const { data } = await Api.updateUser(input);
      if (data && data.errmsg) {
        newInput.setErrors({
          oldPassword: data.errmsg
        });
         setMessage(null);
         return;
      }
      setMessage('Hurray! You have changed your password successfully');
      // Cleaning state and form on success
      newInput.resetForm();
    } catch ({ response }) {
      // Cleanin input and setting error messages on field and screen
      newInput.setErrors({
        oldPassword: 'Can not change password, please try again later'
      });
      setMessage('Opps! Something went wrong, password is not changed');
      console.log('err', response);
    }
  };

  return (
    <>
      {/* Modal; passing inputs, method to clean inputs and reference to trigger sending to DB*/}
      <ProfileModal data={newInput} setData={setNewInput} sendData={sendData} />
      {/* Modal */}
      <TabPanel value={value} index={index}>
        <Formik
          validationSchema={changePasswordValidationSchema}
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
