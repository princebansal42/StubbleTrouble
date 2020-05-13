import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.white,
    padding: theme.spacing(3),
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 48,
    width: 48
  },
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  mapContainer: {
      marginTop: theme.spacing(2),
      position: 'relative',
      height: '300px',
      width: '100%'
    },
    submitButton: {
      marginTop: theme.spacing(2),
      width: '100%'
    }
}));

const Main = props => {
  const { addAuction, className } = props;

  const classes = useStyles();
  const { history } = useRouter();

  const [formState, setFormState] = useState({
    title:"",
    farm_id:"",
    description:"",
    start_time: new Date(),
    starting_price:"",
  });

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }));

  };

  const handleSubmit = async event => {
    event.preventDefault();
    const auctionDetail = {
      farm_id: formState.farm_id,
      description: formState.description,
      start_time: formState.start_time,
      starting_price: formState.starting_price,
    };

    addAuction(auctionDetail);

    history.push('/dashboard/management/auctions');
  };

  return (
    <>
    <Card
      className={clsx(classes.root, className)}
    >
      <div>
          <div>
            <Typography
              color="initial"
              variant="h3"
            >
              Add Auction
            </Typography>
            <br></br>
            <form
              onSubmit={handleSubmit}
            >
              <div className={classes.fields}>
                <TextField
                  fullWidth
                  label="Auction Title"
                  name="title"
                  onChange={handleChange}
                  type="text"
                  value={formState.title}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Farm Id"
                  name="farm_id"
                  onChange={handleChange}
                  type="text"
                  value={formState.farm_id}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Auction description"
                  name="description"
                  onChange={handleChange}
                  type="text"
                  value={formState.description}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Starting price"
                  name="starting_price"
                  onChange={handleChange}
                  type="text"
                  value={formState.starting_price}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Starting time"
                  name="start_time"
                  onChange={handleChange}
                  type="date"
                  value={formState.start_time}
                  variant="outlined"
                />
              </div>

              <Button
                className={classes.submitButton}
                color="secondary"
                size="large"
                type="submit"
                variant="contained"
              >
                Add
              </Button>

            </form>

        </div>
      </div>
    </Card>
    </>
  );
};

Main.propTypes = {
  className: PropTypes.string,
  addAuction: PropTypes.func.isRequired
};

export default Main;
