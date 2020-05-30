import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Page } from 'components';
import {
  Header,
  Main,
} from './components';
import PropTypes from 'prop-types';
import { addAuction } from "actions/auction";
import { getFarmList } from "actions/farms";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const AddAuction = (props) => {
  const classes = useStyles();
  const { addAuction, getFarmList, farms } = props;

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
      title="Default Dashboard"
    >
      <Header />
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
        >
        {farms && (
            <Main addAuction={addAuction} farms={farms}/>
        )}
        </Grid>
      </Grid>
    </Page>
  );
};

AddAuction.propTypes = {
  farms: PropTypes.array.isRequired,
  addAuction: PropTypes.func.isRequired,
  getFarmList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    farms: state.farm.farms,
});

export default connect(mapStateToProps, { addAuction, getFarmList })(AddAuction);
