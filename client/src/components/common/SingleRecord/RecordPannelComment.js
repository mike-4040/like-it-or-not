import React, { useContext } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  ExpansionPanelDetails
} from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import { AppContext } from '../../../Context';

export default function RecordPannelComment({ comment, dateTime, userId }) {
  // Open modals
  const { setEditedRecord, setOpenEdit, records, setOpenDelete } = useContext(
    AppContext
  );
  const handleClickOpenEdit = userId => {
    const edited = records.find(record => record.userId === userId);
    setEditedRecord(edited);
    setOpenEdit(true);
  };
  const handleClickOpenDelete = userId => {
    const edited = records.find(record => record.userId === userId);
    setEditedRecord(edited);
    setOpenDelete(true);
  };

  return (
    <>
      <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
        {/* Here goes dateTime and comment */}
        <Typography style={{ margin: '5px 0' }}>{dateTime}</Typography>
        <Typography>{comment}</Typography>
        <Grid
          container
          justify='flex-end'
          spacing={3}
          styles={{ marginTop: '10px' }}
        >
          {/* here goes edit and delete buttons */}
          <Grid item>
            <IconButton onClick={() => handleClickOpenEdit(userId)}>
              <EditRoundedIcon color='primary' />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={() => handleClickOpenDelete(userId)}>
              <DeleteRoundedIcon color='secondary' />
            </IconButton>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </>
  );
}
