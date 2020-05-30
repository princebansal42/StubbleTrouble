import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
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
    Link,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        padding: 0,
    },
    actions: {
        flexDirection: "column",
        alignItems: "flex-start",
        "& > * + *": {
            marginLeft: 0,
        },
    },
    buttonIcon: {
        marginRight: theme.spacing(1),
    },
}));

const AuctionInfo = (props) => {
    const { auction, className, ...rest } = props;

    const classes = useStyles();

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader title="Auction info" />
            <Divider />
            <CardContent className={classes.content}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Created At</TableCell>
                            <TableCell>{auction.createdAt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Seller</TableCell>
                            <TableCell>{auction.owner}</TableCell>
                        </TableRow>
                        <TableRow selected>
                            <TableCell>ID</TableCell>
                            <TableCell>{auction._id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>farm</TableCell>
                            <TableCell>{auction.farm}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Starting price</TableCell>
                            <TableCell>{auction.starting_price}</TableCell>
                        </TableRow>
                        <TableRow selected>
                            <TableCell>Status</TableCell>
                            <TableCell>{auction.status}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

AuctionInfo.propTypes = {
    className: PropTypes.string,
    auction: PropTypes.object.isRequired,
};

AuctionInfo.defaultProps = {
    orders: {
        _id: "",
        completed: "",
        owner: "",
        description: "",
        starting_price: "",
        farm: "",
        start_time: "",
    },
};

export default AuctionInfo;
