import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';

import getInitials from 'utils/getInitials';
import { ReviewStars, GenericMoreButton, TableEditBar } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

const Results = props => {
  const { className, farms, ...rest } = props;

  const classes = useStyles();

  const [selectedFarms, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = event => {
    const selectedFarms = event.target.checked
      ? farms.map(farm => farm.id)
      : [];

    setSelectedCustomers(selectedFarms);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFarms.indexOf(id);
    let newSelectedCustomers = [];

    if (selectedIndex === -1) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedFarms, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedFarms.slice(1)
      );
    } else if (selectedIndex === selectedFarms.length - 1) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedFarms.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedFarms.slice(0, selectedIndex),
        selectedFarms.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomers(newSelectedCustomers);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleRowDelete = () => {

  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        {farms.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(farms.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="All farms"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedFarms.length === farms.length}
                        color="primary"
                        indeterminate={
                          selectedFarms.length > 0 &&
                          selectedFarms.length < farms.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Farm Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>latitude</TableCell>
                    <TableCell>longitude</TableCell>
                    <TableCell>Area</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {farms.slice(0, rowsPerPage).map(farm => (
                    <TableRow
                      hover
                      key={farm.id}
                      selected={selectedFarms.indexOf(farm.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedFarms.indexOf(farm.id) !== -1
                          }
                          color="primary"
                          onChange={event =>
                            handleSelectOne(event, farm.id)
                          }
                          value={selectedFarms.indexOf(farm.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>{farm.id}</TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <Avatar
                            className={classes.avatar}
                            src={farm.avatar}
                          >
                            {getInitials(farm.name)}
                          </Avatar>
                          <div>
                            <Link
                              color="inherit"
                              component={RouterLink}
                              to="/management/farms/1"
                              variant="h6"
                            >
                              {farm.name}
                            </Link>
                            <div>{farm.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{farm.location}</TableCell>

                      <TableCell>{farm.lat}</TableCell>
                      <TableCell>{farm.lng}</TableCell>
                      <TableCell>{farm.rating}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to="/dashboard/management/farms/1"
                          variant="outlined"
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={farms.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedFarms} onDelete={handleRowDelete}/>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  farms: PropTypes.array.isRequired
};

Results.defaultProps = {
  farms: []
};

export default Results;
