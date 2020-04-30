import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { AppContext } from '../../../Context';

export default function ManageRecordIcons({ recordId }) {
  // Open modals
  const { setEditedRecord, setOpenEdit, records, setOpenDelete } = useContext(
    AppContext
  );

  const handleClickOpenEdit = recordId => {
    const editedRecord = records.find(record => record._id === recordId);
    setEditedRecord(editedRecord);
    setOpenEdit(true);
  };
  const handleClickOpenDelete = recordId => {
    const edited = records.find(record => record._id === recordId);
    setEditedRecord(edited);
    setOpenDelete(true);
  };

  return (
    <div>
      <IconButton onClick={() => handleClickOpenEdit(recordId)}>
        <EditRoundedIcon color='primary' />
      </IconButton>

      <IconButton onClick={() => handleClickOpenDelete(recordId)}>
        <DeleteRoundedIcon color='secondary' />
      </IconButton>
    </div>
  );
}
