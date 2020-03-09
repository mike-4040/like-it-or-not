import React, { useContext } from 'react';

import Modal from './Modal';
import DeleteRecord from './DeleteRecord';
import { AppContext } from '../../Context';

export default function DeleteModal() {
  const { openDelete, handleCloseDelete } = useContext(AppContext);

  return (
    <Modal open={openDelete} onClose={handleCloseDelete}>
      <DeleteRecord />
    </Modal>
  );
}
