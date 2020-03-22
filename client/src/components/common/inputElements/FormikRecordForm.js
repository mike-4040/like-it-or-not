import React, { useState, useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Field, useField } from 'formik';
import FormikFieldInput from './FormikFieldInput';
import Rating from '@material-ui/lab/Rating';
import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText
} from '@material-ui/core/';
import { Select } from 'formik-material-ui';
import { AppContext } from '../../../Context';

const FormikRating = ({ ...props }) => {
  const [field] = useField(props);
  return <Rating {...field} value={Number(field.value)} {...props} />;
};

const useStyles = makeStyles(theme => ({
  rating: {
    padding: '10px'
  },
  formControl: {
    minWidth: '100%',
    margin: '10px 0'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function FormikRecordForm({ errors, touched }) {
  const classes = useStyles();

  const { allCategories } = useContext(AppContext);

  const [labelWidth, setLabelWidth] = useState(0);

  const inputLabel = useRef(null);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <>
      <Grid container justify='center' className={classes.rating}>
        {/* Rating */}
        <Grid item>
          <FormikRating size='large' name='rating' />
        </Grid>
      </Grid>
      {/* Subject Field */}
      <FormikFieldInput
        errors={errors}
        touched={touched}
        name='subject'
        type='text'
        variant='outlined'
        margin='normal'
        label='Tell us what you thinking of'
      />
      {/* Select field */}
      <FormControl
        error={touched.categoryId && errors.categoryId ? true : null}
        variant='outlined'
        className={classes.formControl}
      >
        <InputLabel ref={inputLabel}>Category</InputLabel>
        <Field component={Select} name='categoryId' labelWidth={labelWidth}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {allCategories.map(el => {
            return (
              <MenuItem key={el._id} value={el._id}>
                {el.catName}
              </MenuItem>
            );
          })}
        </Field>
        <FormHelperText>
          {touched.categoryId && errors.categoryId ? errors.categoryId : null}
        </FormHelperText>
      </FormControl>
      {/* Text Area */}
      <FormikFieldInput
        errors={errors}
        touched={touched}
        type='text'
        name='comment'
        multiline={true}
        rows='6'
        margin='normal'
        label='Add story'
      />
    </>
  );
}
