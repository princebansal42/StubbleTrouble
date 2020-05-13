import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button, colors } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {},
  toolbar: {
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  deleteButton: {
    color: theme.palette.white,
    backgroundColor: colors.red[600],
    '&:hover': {
      backgroundColor: colors.red[900]
    }
  },
  deleteIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Header = props => {
  const { id, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Auctions
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Auction: {id}
          </Typography>
        </Grid>

      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired
};

export default Header;
