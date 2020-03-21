import React from 'react';
import { TextField } from '@material-ui/core';

export default function SearchTextInput({ name, ...props }) {
  return (
    <TextField
      variant='outlined'
      margin='normal'
      fullWidth
      id={name}
      name={name}
      {...props}
    />
  );
}
