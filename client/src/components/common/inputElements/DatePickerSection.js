import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Grid } from '@material-ui/core';

// setting Initial date week ago and passing it as default value avoiding state changing.
let initialDate = new Date();
initialDate.setDate(initialDate.getDate() + 7);

export default function DatePickerSection({
  startDate = initialDate,
  setStartDate,
  endDate,
  setEndDate
}) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <KeyboardDatePicker
            id='Start date'
            label='Start date'
            format='MM/dd/yyyy'
            value={startDate}
            onChange={date => setStartDate(date)}
            fullWidth
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <KeyboardDatePicker
            id='Finish date'
            label='Finish date'
            format='MM/dd/yyyy'
            value={endDate}
            onChange={date => setEndDate(date)}
            fullWidth
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
