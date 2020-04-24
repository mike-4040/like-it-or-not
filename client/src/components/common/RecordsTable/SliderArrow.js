import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      style={{ color: 'grey' }}
      className={className}
      onClick={onClick}
    />
  );
}

export function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowBackIosIcon
      style={{ color: 'grey' }}
      className={className}
      onClick={onClick}
    />
  );
}
