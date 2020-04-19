import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import { Page } from 'components';
import { Header, Results } from './components';
import { getFarmList, deleteFarm } from "actions/farms";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const FarmsManagementList = (props) => {
  const classes = useStyles();
  const { getFarmList, farms } = props;

  useEffect(() => {
    let mounted = true;

    getFarmList();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      className={classes.root}
      title="Customer Management List"
    >
      <Header />

      {farms && (
        <Results
          className={classes.results}
          farms={farms}
          deleteFarm={deleteFarm}
        />
      )}
    </Page>
  );
};

FarmsManagementList.propTypes = {
    farms: PropTypes.array.isRequired,
    getFarmList: PropTypes.func.isRequired,
    deleteFarm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  farms: state.farm.farms
});

export default connect(mapStateToProps, { getFarmList, deleteFarm })(FarmsManagementList);
