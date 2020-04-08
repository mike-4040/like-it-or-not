import React from 'react';
import { Field } from 'formik';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function FormikFieldInput({
  name,
  label,
  autoFocus = false,
  touched,
  errors,
  margin = 'none',
  type,
  multiline,
  rows
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordField = () => {
    if (
      name === 'password' ||
      name === 'oldPassword' ||
      name === 'newPassword' ||
      name === 'confirmPassword'
    ) {
      return true;
    }
  };

  const getType = () => {
    if (isPasswordField()) {
      return (type = showPassword ? 'text' : 'password');
    } else {
      return type;
    }
  };

  return (
    <Field
      error={touched[name] && errors[name] ? true : null}
      helperText={touched[name] && errors[name] ? errors[name] : null}
      as={TextField}
      name={name}
      variant='outlined'
      type={getType()}
      fullWidth
      margin={margin}
      label={label}
      autoFocus={autoFocus}
      multiline={multiline ? multiline : false}
      rows={rows ? rows : null}
      InputProps={
        isPasswordField()
          ? {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }
          : null
      }
    />
  );
}
