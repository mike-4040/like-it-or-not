import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Grid } from '@material-ui/core';

export default function DatePickerSection() {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <KeyboardDatePicker
            id='Start date'
            label='Start date'
            format='MM/dd/yyyy'
            value={selectedDate}
            onChange={handleDateChange}
            fullWidth
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <KeyboardDatePicker
            id='Finish date'
            label='Finish date'
            format='MM/dd/yyyy'
            value={selectedDate}
            onChange={handleDateChange}
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
