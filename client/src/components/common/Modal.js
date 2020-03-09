import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent } from '@material-ui/core';

const DialogBox = withStyles(theme => ({
  root: {
    padding: theme.spacing(5)
  }
}))(DialogContent);

export default function SimpleDialog(props) {
  const { onClose, open, children } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
      maxWidth='lg'
    >
      <DialogBox>{children}</DialogBox>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
