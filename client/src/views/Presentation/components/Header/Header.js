import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  header: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    margin: '0 auto',
    padding: '80px 24px',
    [theme.breakpoints.up('md')]: {
      padding: '50px 24px'
    }
  },
  buttons: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  },
  mediaContainer: {
    margin: '0 auto',
    maxWidth: 1600,
    maxHeight: 300,
    padding: theme.spacing(0, 2),
    overflow: 'hidden'
  },
  media: {
    width: '100%'
  },
  stats: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1)
  },
  statsInner: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    margin: '0 auto'
  }
}));

const Header = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
    <div className={classes.mediaContainer}>
      <img
        alt="Demos"
        className={classes.media}
        src="https://www.teriin.org/sites/default/files/inline-images/paddy-residue.jpg"
      />
    </div>
      <div className={classes.header}>
        <Typography
          align="center"
          gutterBottom
          variant="h1"
        >
          Stubble Trouble
        </Typography>

        <Typography
          align="center"
          component="h2"
          variant="subtitle1"
        >
          We are aiming to provide a marketplace and an online self-sustainable business model
          which would connect farmers to potential buyers of stubble. In this way the stubble
          burning could be stopped and could be used in an efficient way.
        </Typography>
        <div className={classes.buttons}>
        </div>
      </div>

      
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
