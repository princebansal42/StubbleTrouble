/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOpen';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';

import useRouter from 'utils/useRouter';
import { logout } from 'actions';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  trialIcon: {
    marginRight: theme.spacing(1)
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  }
}));

const TopBar = props => {
  const { className, auth: { isAuthenticated }, logout, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();
  const searchRef = useRef(null);


  const handleLogout = () => {
    logout();
    history.push("/");
  };

  const goToDashboard = () => {
    history.push('/dashboard');
  };

  const goToLogIn = () => {
    history.push('/auth/login');
  }

  const goToRegister = () => {
    history.push('/auth/register');
  }




  let button;
  if(isAuthenticated) {
	button =  <>
            <Button
              color="inherit"
              className= {classes.logoutButton}
              onClick={goToDashboard}
            >
            <DashboardIcon className={classes.logoutIcon} />
              My Dashboard
            </Button>
            <Button
		        className={classes.logoutButton}
		        color="inherit"
		        onClick={handleLogout}
		        >
            <InputIcon className={classes.logoutIcon} />
            	Sign out
        	  </Button>
            </>

  }
  else{
	button = <>
            <Button
		        className={classes.logoutButton}
		        color="inherit"
		        onClick={goToLogIn}
		        >
            <InputIcon className={classes.logoutIcon} />
            	Sign In
        	  </Button>
            <Button
             className={classes.logoutButton}
             color="inherit"
             onClick={goToRegister}
            >
            <LockIcon className={classes.logoutIcon} />
             Sign Up
            </Button>
            </>
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/images/logos/farm-white.svg"
          />
        </RouterLink>
        <div className={classes.flexGrow} />

       	{button}

      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  auth: PropTypes.object,
  logout: PropTypes.func.isRequired,
};


export default TopBar;
