import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Select from './Select';
import TextArea from './TextArea';
import TextInput from './TextInput';

const useStyles = makeStyles(theme => ({
  rating: {
    padding: '10px'
  }
}));
export default function FormInputs({
  setValues,
  rating,
  subject,
  categoryId,
  comment
}) {
  const classes = useStyles();
  return (
    <>
      <Grid container justify='center' className={classes.rating}>
        <Grid item>
          <Rating
            size='large'
            name='rating'
            value={Number(rating)}
            onChange={setValues}
          />
        </Grid>
      </Grid>
      <TextInput
        value={subject}
        onChange={setValues}
        name='subject'
        label='Tell us what you thinking of'
        autoFocus
      />
      <Select value={categoryId} setValues={setValues} />
      <TextArea value={comment} setValues={setValues} />
    </>
  );
}
