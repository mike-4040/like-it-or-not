import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: '100%',
    margin: '10px 0'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SelectElement() {
  const classes = useStyles();
  const [category, setCategory] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const handleChange = event => {
    setCategory(event.target.value);
  };
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
        value={category}
        onChange={handleChange}
        labelWidth={labelWidth}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        <MenuItem value={'Restaurant'}>Restaurant</MenuItem>
        <MenuItem value={'Food'}>Food</MenuItem>
        <MenuItem value={'Drink'}>Drink</MenuItem>
      </Select>
    </FormControl>
  );
}
