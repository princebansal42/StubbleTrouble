import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, Typography } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import useRouter from "utils/useRouter";

import PusherServer from "pusher";
import PusherClient from "pusher-js";

let config = {
    "pusher-appId": "991405",
    "pusher-key": "b439e5441b9ccae8efcc",
    "pusher-secret": "2daf92084f82b9611efb",
    "pusher-cluster": "ap2",
};
const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.white,
        padding: theme.spacing(3),
        alignItems: "center",
    },
    avatar: {
        backgroundColor: theme.palette.white,
        color: theme.palette.primary.main,
        height: 48,
        width: 48,
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
    mapContainer: {
        marginTop: theme.spacing(2),
        position: "relative",
        height: "300px",
        width: "100%",
    },
    submitButton: {
        marginTop: theme.spacing(2),
        width: "100%",
    },
}));

const Main = (props) => {
    const { id, auction, joinAuction, bidAuction, className } = props;

    const classes = useStyles();
    const { history } = useRouter();

    const [formState, setFormState] = useState({
        bidPrice: "",
    });
    const pusherClient = new PusherClient();
    const pusherServer = new PusherServer({
        appId: config["pusher-appId"],
        key: config["pusher-key"],
        secret: config["pusher-secret"],
        cluster: config["pusher-cluster"],
        encrypted: true,
    });

    const pusherClient = new PusherClient(config["pusher-key"], {
        cluster: config["pusher-cluster"],
    });
    const handleChange = (event) => {
        event.persist();

        setFormState((formState) => ({
            ...formState,
            [event.target.name]: event.target.value,
        }));
    };

    // const handleJoin = async (event) => {
    //     event.preventDefault();

    //     joinAuction(id);
    // };
    const channel = pusherClient.subscribe("new_bid");
    pusherServer.trigger("new_bid", `new-${auction_id}`, last_bid);
    channel.bind(`new-${auction.id}`, (data) => {
        const { auction } = data;
        bidAuction(auction);
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        pusherServer.trigger("get_bid", "add", {
            auction_id: auction.id,
            bidPrice: formState.bidPrice,
            token: localStorage.getItem("token"),
        });
        // history.push("/dashboard/management/auctions");
    };

    // if (!auction) {
    //     return null;
    // }

    // if (auction != null && auction.status != "ACTIVE")
    if (!auction) {
        return (
            <>
                <Card className={clsx(classes.root, className)}>
                    <div>
                        <div>
                            <Typography color='initial' variant='h3'>
                                Sorry, The Auction is not Active, So You Can't
                                Join And Bid
                            </Typography>
                        </div>
                    </div>
                </Card>
            </>
        );
    }

    return (
        <>
            <Card className={clsx(classes.root, className)}>
                <div>
                    <div>
                        <Typography color='initial' variant='h3'>
                            Join Auction and Start Bidding
                        </Typography>
                        <br></br>
                        <Button
                            className={classes.submitButton}
                            color='secondary'
                            size='large'
                            onClick={handleJoin}
                            variant='contained'
                        >
                            Join Auction
                        </Button>
                        <br></br>
                        <br></br>
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
    bidAuction: PropTypes.func.isRequired,
};

export default Main;
