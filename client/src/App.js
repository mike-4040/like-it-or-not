import React, { useState, useEffect } from 'react';
import './App.css';

import api from './utils/api';

function App() {
  const [apiMessage, setApiMessage] = useState('Initial');
  useEffect(() => {
    setApiMessage('Before API');
    api
      .test()
      .then(({data}) => setApiMessage(data))
      .catch(err => console.log(err));
  }, []);

  return <div>Api Message: {apiMessage}</div>;
}

export default App;
