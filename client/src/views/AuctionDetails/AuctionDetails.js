import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import axios from 'utils/axios';
import { Page } from 'components';
import { Header, AuctionInfo, AuctionItems } from './components';

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
  const [order, setOrder] = useState(null);
  const { match: {
      params: { id },
  } } = props;

  useEffect(() => {
    let mounted = true;

    const fetchOrder = () => {
      axios.get('/api/orders/1').then(response => {
        if (mounted) {
          setOrder(response.data.order);
        }
      });
    };

    fetchOrder();

    return () => {
      mounted = false;
    };
  }, []);

  if (!order) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Order Management Details"
    >
      <Header id={id} order={order} />
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
          <AuctionInfo order={order} />
        </Grid>
        <Grid
          item
          md={8}
          xl={9}
          xs={12}
        >
          <AuctionItems id={id} order={order} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default AuctionDetails;
