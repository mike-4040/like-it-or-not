import React, { createContext, useState, useEffect } from 'react';
// import { dummyRecords } from './Dummy';
import Api from './utils/api';

import AuthService from './utils/AuthService';
const Auth = new AuthService();

const AppContext = createContext();

function ContextProvider({ children }) {
  // User States
  const [user, setUser] = useState();
  // Records States
  const [records, setRecords] = useState();
  const [editedRecord, setEditedRecord] = useState();
  //  Modals
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // Categories State
  const [allCategories, setAllCategories] = useState([]);
  console.log('records', records);
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
  /** Get user records and save it to State
   * @param {string} userId
   * @returns void
   */
  const getUserRecords = async userId => {
    try {
      const { data } = await Api.getUserRecords(userId);
      if (data) setRecords(data);
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    const user = Auth.getProfile();
    if (user) {
      setUser({ name: user.firstName, id: user.id });
      Auth.setTokenToHeader();
      getUserRecords(user.id);
    }
    getCategories();
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
