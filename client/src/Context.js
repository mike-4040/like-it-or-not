import React, { createContext, useState, useEffect } from 'react';
// import { dummyRecords } from './Dummy';
import Api from './utils/api';
import AuthService from './utils/AuthService';
const Auth = new AuthService();

const AppContext = createContext();

function ContextProvider({ children }) {
  //Loading state
  const [loading, setLoading] = useState(true);
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

  const getUser = async userId => {
    try {
      const { data: user } = await Api.getUser(userId);
      if (user) {
        setUser(user);
        setLoading(false);
      }
    } catch (err) {
      console.log('err', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getUserRecords(user.id);
  }, [user]);

  useEffect(() => {
    getCategories();
    const storageUser = Auth.getProfile();
    if (storageUser && storageUser.id) {
      Auth.setTokenToHeader();
      getUser(storageUser.id);
      getUserRecords(storageUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        user,
        setUser,
        allCategories,
        setAllCategories,
        getUserRecords,
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
