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
    const { className, orders, ...rest } = props;

    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, page) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    };


    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <Typography color='textSecondary' gutterBottom variant='body2'>
                {orders.length} Records found. Page {page + 1} of{" "}
                {Math.ceil(orders.length / rowsPerPage)}
            </Typography>
            <Card>
                <CardHeader action={<GenericMoreButton />} title='All orders' />
                <Divider />
                <CardContent className={classes.content}>
                    <PerfectScrollbar>
                        <div className={classes.inner}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S.No</TableCell>
                                        <TableCell>Order Id</TableCell>
                                        <TableCell>Seller</TableCell>
                                        <TableCell>Buyer</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>latitude</TableCell>
                                        <TableCell>longitude</TableCell>
                                        <TableCell>Cost</TableCell>
                                        <TableCell align='right'>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.slice(0, rowsPerPage).map((order,index) => (
                                        <TableRow
                                            hover
                                            key={order._id}
                                        >
                                            <TableCell>
                                                {index + 1}
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
                                                            to={`/dashboard/management/orders/${order._id}`}
                                                            variant='h6'
                                                        >
                                                            {order._id}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {order.seller}
                                            </TableCell>
                                            <TableCell>
                                                {order.buyer}
                                            </TableCell>
                                            <TableCell>
                                                {order.address}
                                            </TableCell>

                                            <TableCell>
                                                {order.location.lat}
                                            </TableCell>
                                            <TableCell>
                                                {order.location.long}
                                            </TableCell>
                                            <TableCell>{order.cost}</TableCell>
                                            <TableCell align='right'>
                                                <Button
                                                    color='primary'
                                                    component={RouterLink}
                                                    size='small'
                                                    to={`/dashboard/management/orders/${order._id}`}
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
                        count={orders.length}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </CardActions>
                </Card>
        </div>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    orders: PropTypes.array.isRequired,
};

Results.defaultProps = {
    orders: [],
};

export default Results;
