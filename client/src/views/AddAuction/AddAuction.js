import React from 'react';
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
  const { addAuction } = props;

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
	  <Main addAuction={addAuction}/>
        </Grid>
      </Grid>
    </Page>
  );
};

AddAuction.propTypes = {
  addAuction: PropTypes.func.isRequired,
};

export default connect(null, { addAuction })(AddAuction);
