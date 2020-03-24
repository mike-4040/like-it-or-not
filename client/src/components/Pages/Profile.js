import React from 'react';
import {
  Typography,
  Grid,
  CssBaseline,
  makeStyles,
  Paper,
  Avatar,
  Tab,
  Tabs,
  Box
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import User from '../common/User';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: '40px',
    padding: '30px'
  },
  avatar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabArea: {
    padding: ' 0 10px',
    display: 'flex'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

export default function Profile({ user }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log('user', user);
  return (
    <>
      <CssBaseline />
      <User />
      <Paper className={classes.root}>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={3} className={classes.avatar}>
            <Avatar>
              <PersonIcon />
            </Avatar>
            <p>User name</p>
            <p> user Email</p>
          </Grid>
          <Grid item xs={9} className={classes.tabArea}>
            <Tabs
              orientation='vertical'
              variant='scrollable'
              value={value}
              onChange={handleChange}
              aria-label='Vertical tabs example'
              className={classes.tabs}
            >
              <Tab label='Change name' {...a11yProps(0)} />
              <Tab label='Change password' {...a11yProps(1)} />
              <Tab label='Change email' {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              item 1
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
