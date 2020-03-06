import React, { createContext, useState, useEffect } from 'react';

import Api from './utils/api';

const AppContext = createContext();

function ContextProvider({ children }) {
  // Getting User
  const [user, setUser] = useState();

  useEffect(() => {
    Api.getUser()
      .then(({ data }) => setUser(data))
      .catch(err => console.log(err));
  }, []);

  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
}

export { ContextProvider, AppContext };
