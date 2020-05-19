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
  const { className, auction, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();

  const handleGoToJoin = async event => {
   history.push('/dashboard/management/auctions/join/'+auction._id);
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

                     <Button
                     color="secondary"
                       className={classes.submitButton}
                       size="large"
                       type="submit"
                       onClick={handleGoToJoin}
                       variant="contained"
                     >
                       Go To Join Page
                     </Button>

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
  auction: PropTypes.object.isRequired,
};

export default AuctionItems;
