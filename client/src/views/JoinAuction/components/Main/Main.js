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
  const { id, auction, joinAuction,bidAuction, className } = props;

  const classes = useStyles();
  const { history } = useRouter();

  const [formState, setFormState] = useState({
    bid: "",

  });

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }));

  };

  const handleJoin = async event => {
    event.preventDefault();

    joinAuction(id);

  };

  const handleSubmit = async event => {
    event.preventDefault();

    bidAuction();

    history.push('/dashboard/management/auctions');
  };

  if (!auction) {
    return null;
  }

  if(auction!=null && auction.status != "ACTIVE"){
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
                  Sorry, The  Auction is not Active, So You Can't Join And Bid
                </Typography>
            </div>
          </div>
        </Card>
    </>);
  }

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
              Join Auction and Start Bidding
            </Typography>
            <br></br>
            <Button
              className={classes.submitButton}
              color="secondary"
              size="large"
              onClick={handleJoin}
              variant="contained"
            >
              Join Auction
            </Button>
            <br></br>
            <br></br>
            <form
              onSubmit={handleSubmit}
            >
              <div className={classes.fields}>
                <TextField
                  fullWidth
                  label="Enter Amount"
                  name="bid"
                  onChange={handleChange}
                  type="text"
                  value={formState.bid}
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
                BID
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
  id: PropTypes.string.isRequired,
  auction: PropTypes.object,
  joinAuction: PropTypes.func.isRequired,
  bidAuction : PropTypes.func.isRequired,
};

export default Main;
