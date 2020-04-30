import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const style = {
  position: 'fixed',
  bottom: '40%',
  outline: 'none',
  transition: 'all 0.5s',
  zIndex: '9999',
  minWidth: '35px',
  minHeight: '35px',
  cursor: 'pointer',
  color: 'grey'
};
export function NextArrow({ onClick }) {
  return (
    <ArrowForwardIosIcon
      style={{ ...style, right: '13%' }}
      onClick={() => onClick()}
    />
  );
}

export function PrevArrow({ onClick }) {
  return (
    <ArrowBackIosIcon
      style={{ ...style, left: '13%' }}
      onClick={() => onClick()}
    />
  );
}
