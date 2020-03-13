import React from 'react';
import { Field } from 'formik';
import { TextField } from '@material-ui/core';

export default function FormikFieldInput({
  name,
  label,
  autoFocus = false,
  touched,
  errors,
  margin = 'none'
}) {
  return (
    <Field
      error={touched[name] && errors[name] ? true : null}
      helperText={touched[name] && errors[name] ? errors[name] : null}
      as={TextField}
      name={name}
      variant='outlined'
      type={name}
      fullWidth
      margin={margin}
      label={label}
      autoFocus={autoFocus}
    />
  );
}
