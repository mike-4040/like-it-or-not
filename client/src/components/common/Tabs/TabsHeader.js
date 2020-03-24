import React from 'react';
import { Tab, Tabs } from '@material-ui/core';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

export default function TabsHeader({ value, onChange }) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      indicatorColor='primary'
      textColor='primary'
      variant='fullWidth'
      aria-label='full width tabs example'
    >
      <Tab label='Change name' {...a11yProps(0)} />
      <Tab label='Change email' {...a11yProps(1)} />
      <Tab label='Change password' {...a11yProps(2)} />
    </Tabs>
  );
}
