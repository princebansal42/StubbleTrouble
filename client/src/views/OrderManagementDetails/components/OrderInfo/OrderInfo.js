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

const OrderInfo = props => {
  const { order, className, ...rest } = props;
  console.log(order);
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
      <CardHeader title="Order info" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>

	         <TableRow selected>
              <TableCell>Status</TableCell>
              <TableCell>
                Active
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>Seller</TableCell>
              <TableCell>
                 {order.seller}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Buyer</TableCell>
              <TableCell>
                 {order.buyer}
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>Buyer's Address</TableCell>
              <TableCell>
                 {order.address}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Cost</TableCell>
              <TableCell>
                 {order.cost}
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button>
          <EditIcon className={classes.buttonIcon} />
          Edit
        </Button>
        <Button>
          <ReceiptIcon className={classes.buttonIcon} />
          Resend invoice
        </Button>
      </CardActions>
    </Card>
  );
};

OrderInfo.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired
};


OrderInfo.defaultProps = {
    orders: {
      _id:"",
      seller: "",
      buyer: "",
      address: "",
      cost: ""
    },
};

export default OrderInfo;
