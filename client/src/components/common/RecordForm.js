import React, { useContext } from 'react';
import { Grid, Button } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import useForm from '../costumHooks/useForm';
import { AppContext } from '../../Context';

import FormInputs from './FormInputs';

export default function RecordForm() {
  const { setRecords } = useContext(AppContext);
  let history = useHistory();

  //custom hook to control inputs
  const [values, setValues, reset] = useForm({
    rating: 0,
    subject: '',
    categoryId: '',
    comment: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    const newRecord = {
      userId: new Date().getTime(),
      dateTime: new Date().toLocaleString(),
      ...values
    };
    setRecords(records => {
      return [newRecord, ...records];
    });
    reset({
      rating: 0,
      subject: '',
      categoryId: '',
      comment: ''
    });
    history.push('/main');
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
      <FormInputs setValues={setValues} {...values} />
      <Grid container justify='space-between'>
        <Button type='submit' variant='contained' color='primary'>
          Create memory
        </Button>
        <Button
          component={RouterLink}
          to='/main'
          variant='contained'
          color='secondary'
        >
          Continue
        </Button>
      </Grid>
    </form>
  );
}
