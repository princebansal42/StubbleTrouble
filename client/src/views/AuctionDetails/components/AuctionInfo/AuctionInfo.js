import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Link
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const AuctionInfo = props => {
  const { order, className, ...rest } = props;

  const classes = useStyles();

  const options = ['Canceled', 'Completed', 'Rejected'];

  const [option, setOption] = useState(options[0]);

  const handleChange = event => {
    event.persist();

    setOption(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Auction info" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>
                 Paddy Straw 250 kg
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Seller</TableCell>
              <TableCell>
                 {order.customer.name}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>ID</TableCell>
              <TableCell>#{order.id.split('-').shift()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ref</TableCell>
              <TableCell>{order.ref}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Start-Date</TableCell>
              <TableCell>
                {moment(order.created_at).format('DD/MM/YYYY HH:MM')}
              </TableCell>
            </TableRow>
      	    <TableRow>
              <TableCell>No Of Bids So far</TableCell>
              <TableCell>
                50
              </TableCell>
            </TableRow>
	          <TableRow selected>
              <TableCell>Status</TableCell>
              <TableCell>
                Active
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

AuctionInfo.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired
};

export default AuctionInfo;
