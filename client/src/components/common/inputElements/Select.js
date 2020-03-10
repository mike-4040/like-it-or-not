import React, { useState, useContext, useEffect, useRef } from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../../Context';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: '100%',
    margin: '10px 0'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SelectElement({ setValues, value }) {
  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const { allCategories } = useContext(AppContext);

  return (
    <FormControl
      variant='outlined'
      className={classes.formControl}
      size='small'
    >
      <InputLabel ref={inputLabel} id='demo-simple-select-outlined-label'>
        Category
      </InputLabel>
      <Select
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        name='categoryId'
        value={value}
        onChange={setValues}
        labelWidth={labelWidth}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {allCategories.map(el => {
          return (
            <MenuItem key={el._id} value={el.catName}>
              {el.catName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
