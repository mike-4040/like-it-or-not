import React from 'react';
import { Grid, Button, makeStyles, TextareaAutosize } from '@material-ui/core';
import FormikFieldInput from '../inputElements/FormikFieldInput';

const useStyles = makeStyles(theme => ({
  button: {
    margin: '16px 0'
  }
}));

export default function TableForm({ errors, touched, data }) {
  const classes = useStyles();

  return (
    <Grid container justify='space-around'>
      <Grid item xs={12} md={5}>
        {data.fields.map(el => {
          return (
            <FormikFieldInput
              key={el.name}
              errors={errors}
              touched={touched}
              name={el.name}
              label={el.label}
              type={el.type}
              margin='normal'
            />
          );
        })}
        <Button
          className={classes.button}
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
        >
          Submit
        </Button>
      </Grid>
      <Grid item xs={12} md={5}>
        {data.text}
        {data?.message && (
          <div style={{ margin: '10px', color: 'red', textAlign: 'center' }}>
            <h3>{data.message} </h3>
          </div>
        )}
      </Grid>
    </Grid>
  );
}
