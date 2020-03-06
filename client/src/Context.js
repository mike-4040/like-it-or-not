import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

// fake user from DB
const userDB = {
  email: 'test@m.c',
  password: '124sadgasdgsd'
};

function ContextProvider({ children }) {
  // Getting User
  const [user, setUser] = useState();

  // helper func to get user befor render page
  const getUser = () => {
    // no user returned
    return null;
    // uncoment to return user
    // return userDB
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
}

export { ContextProvider, AppContext };
