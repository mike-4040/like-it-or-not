import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function MultilineTextFields({ value, setValues }) {
  return (
    <TextField
      margin='normal'
      id='outlined-multiline-static'
      name='comment'
      label='Add story'
      multiline
      rows='6'
      variant='outlined'
      fullWidth
      value={value}
      onChange={setValues}
    />
  );
}
