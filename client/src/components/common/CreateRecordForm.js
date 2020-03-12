import React, { useContext } from 'react';
import { Grid, Button } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import useForm from '../costumHooks/useForm';
import { AppContext } from '../../Context';

import RecordFormInputs from './inputElements/RecordFormInputs';

const initialState = {
  rating: 3,
  subject: '',
  categoryId: '',
  comment: ''
};

export default function RecordForm() {
  const { setRecords } = useContext(AppContext);
  let history = useHistory();

  //custom hook to control inputs
  const [values, setValues, reset] = useForm(initialState);

  const handleSubmit = e => {
    e.preventDefault();
    const newRecord = {
      dateTime: new Date().toLocaleString(),
      ...values
    };
    setRecords(records => {
      return [newRecord, ...records];
    });
    reset(initialState);
    history.push('/main');
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
      <RecordFormInputs setValues={setValues} {...values} />
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
