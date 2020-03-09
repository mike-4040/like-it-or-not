import React, { useContext } from 'react';

import Modal from './Modal';
import DeleteRecord from './DeleteRecord';
import { AppContext } from '../../Context';

export default function DeleteModal() {
  const { openDelete, setOpenDelete } = useContext(AppContext);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Modal open={openDelete} onClose={handleCloseDelete}>
      <DeleteRecord />
    </Modal>
  );
}
