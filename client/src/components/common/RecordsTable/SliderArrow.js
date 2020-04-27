import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export function NextArrow({ onClick, ...rest }) {
  const {
    onMove,
    carouselState: { currentSlide, deviceType }
  } = rest;
  // onMove means if dragging or swiping in progress.

  return (
    <ArrowForwardIosIcon
      style={{ color: 'grey' }}
      // className='custom-left-arrow'
      onClick={() => onClick()}
    />
  );
}

export function PrevArrow({ onClick, ...rest }) {
  const {
    onMove,
    carouselState: { currentSlide, deviceType }
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <ArrowBackIosIcon style={{ color: 'black' }} onClick={() => onClick()} />
  );
}
