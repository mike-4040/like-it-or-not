import React, { createContext, useState, useEffect } from 'react';
import { dummyRecords } from './Dummy';
import Api from './utils/api';

const AppContext = createContext();

function ContextProvider({ children }) {
  // User States
  const [user, setUser] = useState({ user: {}, loading: true });
  // Records States
  const [records, setRecords] = useState();
  const [editedRecord, setEditedRecord] = useState();
  // Searches States
  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    setRecords(dummyRecords);
  }, []);

  //  MODALS START
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

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

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  // MODALS END

  return (
    <AppContext.Provider
      value={{
        user,
        records,
        setRecords,
        editedRecord,
        setEditedRecord,
        searchText,
        setSearchText,
        searchCategory,
        setSearchCategory,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        openEdit,
        openDelete,
        handleCloseDelete,
        handleClickOpenDelete,
        handleClickOpenEdit,
        handleCloseEdit
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { ContextProvider, AppContext };
