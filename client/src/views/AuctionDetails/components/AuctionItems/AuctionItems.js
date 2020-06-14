import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import useRouter from "utils/useRouter";
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
    Typography,
} from "@material-ui/core";

// import PusherServer from "pusher";
import PusherClient from "pusher-js";

import bidForAuction from "utils/bidForAuction";
let config = {
    "pusher-appId": "991405",
    "pusher-key": "b439e5441b9ccae8efcc",
    "pusher-secret": "2daf92084f82b9611efb",
    "pusher-cluster": "ap2",
};

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        padding: 0,
    },
    inner: {
        minWidth: 700,
    },
    fields: {
        margin: theme.spacing(-1),
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            flexGrow: 1,
            margin: theme.spacing(1),
        },
    },
    submitButton: {
        marginTop: theme.spacing(2),
        width: "100%",
    },
}));

const AuctionItems = (props) => {
    const { className, auction, bidAuction, ...rest } = props;

    const classes = useStyles();
    const { history } = useRouter();

    let bidPrice = auction.starting_price;
    if (auction.last_bid) bidPrice = auction.last_bid.bidPrice;
    const [formState, setFormState] = useState({
        bidPrice,
    });
    // const pusherServer = new PusherServer({
    //     appId: config["pusher-appId"],
    //     key: config["pusher-key"],
    //     secret: config["pusher-secret"],
    //     cluster: config["pusher-cluster"],
    //     useTLS: true,
    // });

    const pusherClient = new PusherClient(config["pusher-key"], {
        cluster: config["pusher-cluster"],
    });

    const channel = pusherClient.subscribe(`${auction._id}`);
    // pusherServer.trigger("new_bid", `new-${auction.id}`, last_bid);
    channel.bind("new_bid", (data) => {
        console.log("PUSHER GAVE THIS TO US");
        // console.log(data);

        // const { auction } = data;
        bidAuction(data);
        setFormState((formState) => ({
            ...formState,
            bidPrice: data.last_bid.bidPrice,
        }));
    });

    const handleChange = (event) => {
        event.persist();

        const { name, value } = event.target;
        setFormState((formState) => ({
            ...formState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(" ---- Tried to Bid ---- ");
        console.log(`${auction._id}, ${formState.bidPrice}`);
        bidForAuction(auction._id, formState.bidPrice);

        // pusherServer.trigger("get_bid", "add", {
        //     auction_id: auction.id,
        //     bidPrice: formState.bidPrice,
        //     token: localStorage.getItem("token"),
        // });
    };
    let display = "";
    if (auction.status === "PENDING") {
        display = (
            <div className={classes.inner}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                The Auction is Not Yet started.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Wait for sometime till the auction starts.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    } else if (auction.status === "ACTIVE") {
        display = (
            <div>
                <div>
                    <Typography color="initial" variant="h3">
                        Join Auction and Start Bidding
                    </Typography>
                    <br></br>
                    <p>This is the new price{auction.last_bid.bidPrice}</p>
                    <br></br>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.fields}>
                            <TextField
                                fullWidth
                                label="Enter Amount"
                                name="bidPrice"
                                onChange={handleChange}
                                type="number"
                                value={formState.bidPrice}
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
        );
    } else {
        let winner = "";
        if (auction.last_bid) {
            winner = (
                <TableRow>
                    <TableCell>Winner is :</TableCell>
                    <TableCell>{auction.last_bid.bidPrice}</TableCell>
                </TableRow>
            );
        } else
            winner = (
                <TableRow>
                    <TableCell>No one placed a bid.</TableCell>
                </TableRow>
            );
        display = (
            <div className={classes.inner}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>The Auction is Completed.</TableCell>
                        </TableRow>
                        {winner}
                    </TableBody>
                </Table>
            </div>
        );
    }
    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader title="Auction Description" />
            <Divider />
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{auction.description}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <CardContent className={classes.content}>
                <PerfectScrollbar>{display}</PerfectScrollbar>
            </CardContent>
        </Card>
    );
};

AuctionItems.propTypes = {
    className: PropTypes.string,
    auction: PropTypes.object.isRequired,
};

export default AuctionItems;
