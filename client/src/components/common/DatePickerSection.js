import React, { useContext } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Grid } from '@material-ui/core';
import { AppContext } from '../../Context';

export default function DatePickerSection() {
  let { startDate, setStartDate, endDate, setEndDate } = useContext(AppContext);

  // startDate = new Date();
  // startDate.setDate(startDate.getDate() - 7);

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
