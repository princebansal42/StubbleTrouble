import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/styles';
import PropTypes from "prop-types";

import axios from 'utils/axios';
import { Page } from 'components';
import { Header, Results } from './components';
import { getOrderList } from "actions/order";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const OrderManagementList = (props) => {
  const classes = useStyles();
  const { getOrderList, orders } = props;

  useEffect(() => {
    let mounted = true;

    getOrderList();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      className={classes.root}
      title="Orders Management List"
    >
      <Header />
      <Results
        className={classes.results}
        orders={orders} 
      />
    </Page>
  );
};

OrderManagementList.propTypes = {
    orders: PropTypes.array.isRequired,
    getOrderList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    orders: state.order.orders,
});

export default connect(mapStateToProps, { getOrderList })(OrderManagementList);
