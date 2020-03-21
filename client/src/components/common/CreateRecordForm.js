import React, { useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Api from '../../utils/api';
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
  const { setRecords, user } = useContext(AppContext);
  let history = useHistory();

  //custom hook to control inputs
  const [values, setValues, reset] = useForm(initialState);

  const handleSubmit = async e => {
    e.preventDefault();
    const newRecord = {
      userId: user.id,
      dateTime: Date.now(),
      ...values
    };
    try {
      const { data } = await Api.createRecord(newRecord);
      console.log(data);
      if (data) {
        setRecords(records => (records ? [data, ...records] : [data]));
        reset(initialState);
        history.push('/main');
      }
    } catch (err) {
      console.log('err', err);
    }
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
