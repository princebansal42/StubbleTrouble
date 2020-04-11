import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Page } from 'components';
import {
  Header,
  Main,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const FarmEdit = (props) => {
  const classes = useStyles();

  const { match :{params : { id } } } = props;

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
	       <Main id = {id}/>
        </Grid>
      </Grid>
    </Page>
  );
};

export default FarmEdit;
