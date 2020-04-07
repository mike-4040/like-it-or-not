import React from 'react';
import {
  CssBaseline,
  Container,
  makeStyles,
  Grid,
  Typography,
  Button,
  Popover,
  Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoBox: {
    textAlign: 'center',
    padding: '20px'
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.4rem'
    }
  },
  social: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },
  text: {
    height: '300px',
    padding: '20px',
    borderLeft: '1px solid black',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      borderLeft: 'none'
    }
  },
  icon: {
    transition: 'all .2s linear',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
      transform: 'scale(1.1)'
    }
  },
  instagram: {
    cursor: 'pointer',
    transition: 'all .2s linear',
    borderRadius: '5px',
    '&:hover': {
      transform: 'scale(1.1)',
      background:
        'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
      color: 'white'
    }
  },
  typography: {
    padding: theme.spacing(2)
  },
  links: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

export default function LandingPage() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [linkedIn, setLinkedIn] = React.useState(null);

  const handleClick = (event, link) => {
    setLinkedIn(link);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <CssBaseline />
      <Container component='main' maxWidth='md' className={classes.root}>
        <Grid container alignItems='center'>
          <Grid item xs={12} md={6} className={classes.logoBox}>
            <Typography className={classes.logo} component='h1' variant='h2'>
              Like it or not
            </Typography>
            <Button component={RouterLink} to='/signin'>
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6} className={classes.text}>
            <Typography component='p' variant='h6'>
              Welcome to the most successful app ever
            </Typography>
            <Typography component='p' variant='subtitle1'>
              Here and only here you can truly trust yourself. <br />
              Make a memory. Give it a rate. Now your best memories will never
              disappear.
              <br />
              <br />
              Special Thanks to{' '}
              <span
                className={classes.links}
                aria-describedby={id}
                onClick={e =>
                  handleClick(e, 'https://www.linkedin.com/in/mike4040/')
                }
              >
                Mike Kravtsov
              </span>{' '}
              and{' '}
              <span
                className={classes.links}
                aria-describedby={id}
                onClick={e =>
                  handleClick(
                    e,
                    'https://www.linkedin.com/in/kostiantyn-agapov/'
                  )
                }
              >
                Konstantyn Agapov
              </span>{' '}
              for developing this beauty
            </Typography>
            <hr />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <Typography className={classes.typography}>
                <Link href={linkedIn} rel='noopener'>
                  {linkedIn}
                </Link>
              </Typography>
            </Popover>
            <br />
            <Grid container spacing={4} className={classes.social}>
              <Grid item>
                <InstagramIcon className={classes.instagram} />
              </Grid>
              <Grid item>
                <FacebookIcon className={classes.icon} />
              </Grid>
              <Grid item>
                <TwitterIcon className={classes.icon} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
