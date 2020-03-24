import React from 'react';
import {
  Grid,
  CssBaseline,
  makeStyles,
  Paper,
  Avatar,
  Box,
  Container,
  Typography
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import User from '../common/User';
import ChangeName from '../common/Tabs/ChangeName';
import ChangeEmail from '../common/Tabs/ChangeEmail';
import ChangePassword from '../common/Tabs/ChangePassword';
import TabsHeader from '../common/Tabs/TabsHeader';

const useStyles = makeStyles(theme => ({
  root: {
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

export default function Profile({ user }) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <CssBaseline />
      <User />
      <Container>
        <Paper className={classes.root}>
          <Grid container justify='center' direction='column'>
            <Grid item className={classes.avatar}>
              <Avatar>
                <PersonIcon />
              </Avatar>
              <Box p={3}>
                <Typography variant='body1' component='p'>
                  Andrey Kuznetsov <em>andrey@gmail.com</em>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} className={classes.tables}>
              <TabsHeader value={value} onChange={handleChange} />
              <ChangeName value={value} index={0} />
              <ChangeEmail value={value} index={1} />
              <ChangePassword value={value} index={2} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
