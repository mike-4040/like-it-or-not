import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export default function SliderElement() {
  const PrettoSlider = withStyles({
    root: {
      height: 8
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit'
      }
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)'
    },
    track: {
      height: 8,
      borderRadius: 4
    },
    rail: {
      height: 8,
      borderRadius: 4
    }
  })(Slider);

  return (
    <>
      <PrettoSlider
        min={1}
        max={5}
        valueLabelDisplay='auto'
        aria-label='pretto slider'
        defaultValue={3}
        color='secondary'
      />
    </>
  );
}
