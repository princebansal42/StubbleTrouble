import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import useRouter from 'utils/useRouter';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
} from '@material-ui/core';

import PusherServer from "pusher";
import PusherClient from "pusher-js";

let config = {
    "pusher-appId": "991405",
    "pusher-key": "b439e5441b9ccae8efcc",
    "pusher-secret": "2daf92084f82b9611efb",
    "pusher-cluster": "ap2",
};

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
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
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const AuctionItems = props => {
  const { className, auction, bidAuction, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();
  const [formState, setFormState] = useState({
      bidPrice: "",
  });
  var pusherClient = new PusherClient();
  const pusherServer = new PusherServer({
      appId: config["pusher-appId"],
      key: config["pusher-key"],
      secret: config["pusher-secret"],
      cluster: config["pusher-cluster"],
      encrypted: true,
  });

  var pusherClient = new PusherClient(config["pusher-key"], {
      cluster: config["pusher-cluster"],
  });

  const handleChange = (event) => {
      event.persist();

      setFormState((formState) => ({
          ...formState,
          [event.target.name]: event.target.value,
      }));
  };

  const channel = pusherClient.subscribe("new_bid");
  pusherServer.trigger("new_bid", `new-${auction._id}`, 'last_bid');
  channel.bind(`new-${auction._id}`, (data) => {
      const { auction } = data;
      bidAuction(auction);
  });
  const handleSubmit = async (event) => {
      event.preventDefault();
      pusherServer.trigger("get_bid", "add", {
          auction_id: auction._id,
          bidPrice: formState.bidPrice,
          token: localStorage.getItem("token"),
      });
      // history.push("/dashboard/management/auctions");
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Auction Description" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableBody>
                <TableRow >
                   <TableCell>
                     {auction.description}
                   </TableCell>
                </TableRow>
                <TableRow >
                   <TableCell>
                   <form onSubmit={handleSubmit}>
                       <div className={classes.fields}>
                           <TextField
                               fullWidth
                               label='Enter Amount'
                               name='bid'
                               onChange={handleChange}
                               type='number'
                               value={formState.bidPrice}
                               variant='outlined'
                           />
                       </div>

                       <Button
                           className={classes.submitButton}
                           color='secondary'
                           size='large'
                           type='submit'
                           variant='contained'
                       >
                           BID
                       </Button>
                   </form>
                   </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

AuctionItems.propTypes = {
  className: PropTypes.string,
  auction: PropTypes.object,
  bidAuction: PropTypes.func.isRequired,
};

export default AuctionItems;
