import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  inner: {
    padding: theme.spacing(6, 3),
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto'
  },
  media: {
    '& img': {
      width: '100%',
      height: 'auto'
    }
  }
}));

const AuctionsFlows = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.inner}>
        <Grid
          alignItems="center"
          container
          justify="space-between"
        >
          <Grid
            item
            lg={3}
            md={6}
            xs={12}
          >
            <Typography
              gutterBottom
              variant="h3"
            >
              Auctions
            </Typography>
            <Typography variant="subtitle2">
              We have Auctions for buying and selling Stubble which makes this platform more profitable for both farmers and buyers.
            </Typography>
          </Grid>
          <Grid
            className={classes.media}
            item
            lg={4}
            md={6}
            xs={12}
          >
            <img
              alt="User flows"
              src="/images/presentation/auctions.png"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

AuctionsFlows.propTypes = {
  className: PropTypes.string
};

export default AuctionsFlows;
