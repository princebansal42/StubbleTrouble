import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { Page } from "components";
import { Header, Main } from "./components";
import PropTypes from "prop-types";
import { joinAuction, bidAuction, getAuction } from "actions/auction";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    container: {
        marginTop: theme.spacing(3),
    },
}));

const JoinAuction = (props) => {
    const classes = useStyles();
    const {
        match: {
            params: { id },
        },
        joinAuction,
        bidAuction,
        getAuction,
        auction,
    } = props;

    useEffect(() => {
        let mounted = true;

        joinAuction(id);

        return () => {
            mounted = false;
        };
    }, []);

    if (!auction) {
        return null;
    }

    return (
        <Page className={classes.root} title='Default Dashboard'>
            <Header id={id} />
            <Grid className={classes.container} container spacing={3}>
                <Grid item lg={12} sm={12} xs={12}>
                    <Main
                        id={id}
                        joinAuction={joinAuction}
                        bidAuction={bidAuction}
                        auction={auction}
                    />
                </Grid>
            </Grid>
        </Page>
    );
};

JoinAuction.propTypes = {
    auction: PropTypes.object,
    joinAuction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auction: state.auction.auction,
});

export default connect(mapStateToProps, {
    joinAuction,
    bidAuction,
    getAuction,
})(JoinAuction);
