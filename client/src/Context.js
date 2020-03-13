import React, { createContext, useState, useEffect } from 'react';
import { dummyRecords } from './Dummy';
import Api from './utils/api';

const AppContext = createContext();

function ContextProvider({ children }) {
  // User States
  const [user, setUser] = useState({});
  // Records States
  const [records, setRecords] = useState();
  const [editedRecord, setEditedRecord] = useState();
  //  Modals
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // Categories State
  const [allCategories, setAllCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await Api.getCategories();
      if (data) {
        setAllCategories(data);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    getCategories();
    setRecords(dummyRecords);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        allCategories,
        setAllCategories,
        records,
        setRecords,
        editedRecord,
        setEditedRecord,
        openEdit,
        setOpenEdit,
        openDelete,
        setOpenDelete
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { ContextProvider, AppContext };
