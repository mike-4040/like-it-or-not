import React, { useContext } from 'react';
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

  tables: {
    padding: '10px'
  }
}));

export default function Profile() {
  const classes = useStyles();

  let { user } = useContext(AppContext);

  const [value, setValue] = React.useState(0);

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
            <Grid item xs={12} md={4}>
              <UserCard user={user} />
            </Grid>
            <Grid item xs={12} md={8} className={classes.tables}>
              <TabsHeader value={value} onChange={handleChange} />
              <ChangeName value={value} index={0} user={user} />
              <ChangeEmail value={value} index={1} user={user} />
              <ChangePassword value={value} index={2} user={user} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
