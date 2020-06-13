import React, { Fragment, Suspense } from 'react';
import { connect } from "react-redux";
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import { Alerts } from "components";

import { TopBar } from './components';
import { logout } from "actions";

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
}));

const Landing = props => {
  const { route, logout, auth } = props;

  const classes = useStyles();

  return (
    <Fragment>
      <TopBar auth={auth} logout={logout}/>
      <main className={classes.content}>
        <Alerts />
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
      </main>
    </Fragment>
  );
};

Landing.propTypes = {
  route: PropTypes.object,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Landing);
