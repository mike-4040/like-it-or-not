import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import SelectCategory from './inputElements/SelectCategory';
import SearchTextInput from './inputElements/SearchTextInput';
import DatePickerSection from './inputElements/DatePickerSection';

const useStyles = makeStyles(theme => ({
  section: {
    alignItems: 'center'
  }
}));

export default function SearchBar({
  searchText,
  setSearchText,
  searchCategory,
  setSearchCategory,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) {
  const classes = useStyles();

  const handleSelect = e => {
    setSearchCategory(e.target.value);
  };

  return (
    <>
      <Grid container className={classes.section} spacing={2}>
        <Grid item xs={12} sm={6}>
          <SearchTextInput
            size='small'
            name='search'
            label='Search'
            autoFocus
            style={{ margin: 0 }}
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectCategory value={searchCategory} setValues={handleSelect} />
        </Grid>
      </Grid>
      <DatePickerSection
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </>
  );
}
