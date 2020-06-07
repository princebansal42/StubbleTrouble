import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { Page } from 'components';
import {
  Header,
  OrdersFlows,
  FarmsFlows,
  AuctionsFlows
} from './components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Presentation = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Presentation"
    >
      <Header />
      <AuctionsFlows />
      <FarmsFlows />
      <OrdersFlows />
    </Page>
  );
};

export default Presentation;
