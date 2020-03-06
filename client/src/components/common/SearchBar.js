import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Select from './Select';
import TextInput from './TextInput';
import DatePickerSection from './DatePickerSection';

const useStyles = makeStyles(theme => ({
  section: {
    alignItems: 'center',
    marginTop: '5%'
  }
}));

export default function SearchBar() {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.section} spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextInput
            size='small'
            name='search'
            label='search'
            autoFocus
            style={{ margin: 0 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select />
        </Grid>
      </Grid>
      <DatePickerSection />
    </>
  );
}
