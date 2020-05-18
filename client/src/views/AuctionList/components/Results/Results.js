import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
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
    Typography,
} from "@material-ui/core";

import { GenericMoreButton, TableEditBar } from "components";

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        padding: 0,
    },
    inner: {
        minWidth: 700,
    },
    nameCell: {
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        height: 42,
        width: 42,
        marginRight: theme.spacing(1),
    },
    actions: {
        padding: theme.spacing(1),
        justifyContent: "flex-end",
    },
}));

const Results = (props) => {
    const { className, auctions, deleteAuction, ...rest } = props;

    const classes = useStyles();

    const [selectedAuctions, setSelectedAuctions] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSelectAll = (event) => {
        const selectedAuctions = event.target.checked
            ? auctions.map((auction) => auction.id)
            : [];

        setSelectedAuctions(selectedAuctions);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedAuctions.indexOf(id);
        let newSelectedAuctions = [];

        if (selectedIndex === -1) {
            newSelectedAuctions = newSelectedAuctions.concat(selectedAuctions, id);
        } else if (selectedIndex === 0) {
            newSelectedAuctions = newSelectedAuctions.concat(selectedAuctions.slice(1));
        } else if (selectedIndex === selectedAuctions.length - 1) {
            newSelectedAuctions = newSelectedAuctions.concat(
                selectedAuctions.slice(0, -1)
            );
        } else if (selectedIndex > 0) {
            newSelectedAuctions = newSelectedAuctions.concat(
                selectedAuctions.slice(0, selectedIndex),
                selectedAuctions.slice(selectedIndex + 1)
            );
        }

        setSelectedAuctions(newSelectedAuctions);
    };

    const handleChangePage = (event, page) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    };

    const handleRowDelete = async () => {
        selectedAuctions.forEach((item, i) => {
            deleteAuction(item);
        });
    };

    const handleCancel = () => {
        setSelectedAuctions([]);
    };

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <Typography color='textSecondary' gutterBottom variant='body2'>
                {auctions.length} Records found. Page {page + 1} of{" "}
                {Math.ceil(auctions.length / rowsPerPage)}
            </Typography>
            <Card>
                <CardHeader action={<GenericMoreButton />} title='All Auctions' />
                <Divider />
                <CardContent className={classes.content}>
                    <PerfectScrollbar>
                        <div className={classes.inner}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S.No</TableCell>
                                        <TableCell>Auction Id</TableCell>
                                        <TableCell>owner</TableCell>
                                        <TableCell>farm</TableCell>
                                        <TableCell>Start date</TableCell>
                                        <TableCell>Start price</TableCell>
                                        <TableCell>completed</TableCell>
                                        <TableCell align='right'>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {auctions.slice(0, rowsPerPage).map((auction, index) => (
                                      <TableRow
                                          hover
                                          key={auction._id}
                                          selected={
                                              selectedAuctions.indexOf(
                                                  auction._id
                                              ) !== -1
                                          }
                                      >
                                          <TableCell padding='checkbox'>
                                              <Checkbox
                                                  checked={
                                                      selectedAuctions.indexOf(
                                                          auction._id
                                                      ) !== -1
                                                  }
                                                  color='primary'
                                                  onChange={(event) =>
                                                      handleSelectOne(
                                                          event,
                                                          auction._id
                                                      )
                                                  }
                                                  value={
                                                      selectedAuctions.indexOf(
                                                          auction._id
                                                      ) !== -1
                                                  }
                                              />
                                          </TableCell>

                                            <TableCell>
                                                <div
                                                    className={classes.nameCell}
                                                >
                                                    <div>
                                                        <Link
                                                            color='inherit'
                                                            component={
                                                                RouterLink
                                                            }
                                                            to={`/dashboard/management/auctions/${auction._id}`}
                                                            variant='h6'
                                                        >
                                                            {auction._id}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{auction.owner}</TableCell>
                                            <TableCell>
                                                {auction.farm}
                                            </TableCell>
                                            <TableCell>
                                                {auction.start_time}
                                            </TableCell>
                                            <TableCell>
                                              {auction.starting_price}
                                            </TableCell>
                                            <TableCell>
                                              {auction.completed == true ? "True" : "False"}
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Button
                                                    color='primary'
                                                    component={RouterLink}
                                                    size='small'
                                                    to={`/dashboard/management/auctions/${auction._id}`}
                                                    variant='outlined'
                                                >
                                                    View
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
                        component='div'
                        count={auctions.length}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                    <TableEditBar
                        selected={selectedAuctions}
                        onCancel={handleCancel}
                        onDelete={handleRowDelete}
                    />
                </CardActions>
            </Card>
        </div>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    auctions: PropTypes.array.isRequired,
    deleteAuction: PropTypes.func.isRequired
};

Results.defaultProps = {
    auctions: [],
};

export default Results;