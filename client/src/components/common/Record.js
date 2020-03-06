import React from 'react';
import {
  makeStyles,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  IconButton
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Modal from './Modal';
import Form from './Form';
import DeleteRecord from './DeleteRecord';

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      background: 'rgba(0,0,0,0.014)'
    },
    '&::before ': {
      background: 'none'
    },
    transition: 'all .1s linear',
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    boxShadow: 'none',
    margin: '7px 0',
    '&:first-child ': {
      margin: '0 0 7px'
    },
    '&:last-child ': {
      marginBottom: '7px'
    }
  },
  heading: {
    justifyContent: 'space-between'
  },
  comment: {
    flexDirection: 'column'
  },
  icons: {
    marginTop: '10px'
  }
}));

export default function Record({ id, name, comment, time, rating, category }) {
  const classes = useStyles();

  //   Open modals
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Grid container justify='space-between' alignItems='center'>
            {/* Here goes the name of the record */}
            <Grid item xs={7}>
              <Typography component='h2' variant='body1'>
                {name}
              </Typography>
            </Grid>
            {/* Here goes rating */}
            <Grid item xs={4} md={3}>
              <Rating name='size-small' size='small' value={rating} readOnly />
            </Grid>
            {/* This one is for category */}
            <Grid item xs={2}>
              <Typography component='h2' variant='subtitle2'>
                {category}
              </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.comment}>
          {/* Here goes time and comment */}
          <Typography style={{ margin: '5px 0' }}>{time}</Typography>
          <Typography>{comment}</Typography>
          <Grid
            container
            justify='flex-end'
            spacing={3}
            className={classes.icons}
          >
            <Grid item>
              <IconButton onClick={handleClickOpenEdit}>
                <EditRoundedIcon color='primary' />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClickOpenDelete}>
                <DeleteRoundedIcon color='secondary' />
              </IconButton>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {/* MODAL EDIT*/}
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Form />
      </Modal>
      {/* MODAL Delete*/}
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <DeleteRecord />
      </Modal>
    </>
  );
}
