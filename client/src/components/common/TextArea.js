import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function MultilineTextFields() {
  return (
    <TextField
      margin='normal'
      id='outlined-multiline-static'
      label='Add story'
      multiline
      rows='6'
      variant='outlined'
      fullWidth
    />
  );
}
