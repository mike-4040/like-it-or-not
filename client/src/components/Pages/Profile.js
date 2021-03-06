import React, { useContext, useState } from 'react';
import {
  Grid,
  CssBaseline,
  makeStyles,
  Paper,
  Container
} from '@material-ui/core';
import { AppContext } from '../../Context';
import UserCard from '../common/UserCard';
import User from '../common/User';
import ChangeName from '../common/Tabs/ChangeName';
import ChangeEmail from '../common/Tabs/ChangeEmail';
import ChangePassword from '../common/Tabs/ChangePassword';
import TabsHeader from '../common/Tabs/TabsHeader';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '20px',
    marginTop: '2rem ',
    minHeight: '75vh'
  },
  avatar: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  userCard: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto'
    }
  },
  tables: {
    padding: '10px'
  }
}));

export default function Profile() {
  const classes = useStyles();

  let { user, setUser } = useContext(AppContext);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <CssBaseline />
      <User />
      <Container>
        <Paper elevation={3} className={classes.root}>
          <Grid container>
            <Grid item xs={12} sm={8} md={4} className={classes.userCard}>
              <UserCard user={user} />
            </Grid>
            <Grid item xs={12} md={8} className={classes.tables}>
              <TabsHeader value={value} onChange={handleChange} />
              <ChangeName
                value={value}
                index={0}
                user={user}
                setUser={setUser}
              />
              <ChangeEmail
                value={value}
                index={1}
                user={user}
                setUser={setUser}
              />
              <ChangePassword value={value} index={2} user={user} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
