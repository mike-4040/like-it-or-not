import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';

import Slider from './Slider';
import Select from './Select';
import TextArea from './TextArea';
import TextInput from './TextInput';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  rating: {
    padding: '10px'
  }
}));

export default function Form() {
  const classes = useStyles();

  const [value, setValue] = useState(3);

  return (
    <form className={classes.form}>
      <Grid container justify='center' className={classes.rating}>
        <Grid item>
          <Rating
            size='large'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Grid>
      </Grid>
      {/* <Slider /> */}
      <TextInput name='record' label='Tell us what you thinking of' autoFocus />
      <Select />
      <TextArea />
      <Grid container justify='space-between'>
        <Button type='submit' variant='contained' color='primary'>
          Create memory
        </Button>
        <Button variant='contained' color='secondary'>
          Continue
        </Button>
      </Grid>
    </form>
  );
}
