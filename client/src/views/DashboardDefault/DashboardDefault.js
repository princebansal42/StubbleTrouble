import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import { Page } from 'components';
import {
  Header,
  LatestOrders,
  RealTime,
  TeamTasks,
  TodaysMoney,
  PerformanceOverTime,
  Tile
} from './components';

import contents from './componentsConfig';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const DashboardDefault = (props) => {
  const { auth:{ user }, ...rest } = props;
  let userType;;
  if (user) {
    userType = user.userType;
  }
  else {
    userType = 'buyer';
  }

  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Default Dashboard"
    >
      <Header />
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
      {contents['farmer'].map(tile => (
        <Grid
          item
          lg={6}
          sm={6}
          xs={12}
        >
	       <Tile  title={tile.title} href={tile.href} Icon={tile.icon}/>
        </Grid>
      ))}
        <Grid
          item
          lg={3}
          xs={12}
        >
          <RealTime />
        </Grid>
        <Grid
          item
          lg={9}
          xs={12}
        >
          <PerformanceOverTime />
        </Grid>
        <Grid
          item
          lg={12}
          xl={12}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
    </Page>
  );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(DashboardDefault);
