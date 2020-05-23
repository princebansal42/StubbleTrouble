import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import axios from 'utils/axios';
import { Page } from 'components';
import { Header, AuctionInfo, AuctionItems } from './components';
import { getAuction, bidAuction } from "actions/auction";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const AuctionDetails = (props) => {
  const classes = useStyles();
  const { match: {
      params: { id },
  } , auction, getAuction, bidAuction } = props;

  useEffect(() => {
    let mounted = true;

    getAuction(id);

    return () => {
      mounted = false;
    };
  }, []);

  if (!auction) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Auction Details"
    >
      <Header id={id} />
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        <Grid
          item
          md={4}
          xl={3}
          xs={12}
        >
          <AuctionInfo auction={auction}  />
        </Grid>
        <Grid
          item
          md={8}
          xl={9}
          xs={12}
        >
          <AuctionItems auction={auction} bidAuction={bidAuction} />
        </Grid>
      </Grid>
    </Page>
  );
};

const mapStateToProps = (state) => ({
    auction: state.auction.auction,
});

export default connect(mapStateToProps, { getAuction, bidAuction })(AuctionDetails);
