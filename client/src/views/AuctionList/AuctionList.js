import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { Page } from "components";
import { Header, Results } from "./components";
import { getAuctionList, deleteAuction } from "actions/auction";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    results: {
        marginTop: theme.spacing(3),
    },
}));

const AuctionsList = (props) => {
    const classes = useStyles();
    const { getAuctionList, deleteAuction, auctions, auth} = props;

    useEffect(() => {
        let mounted = true;

        getAuctionList();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <Page className={classes.root} title='Customer Management List'>
            <Header auth={auth} />

            {auctions && (
                <Results
                    className={classes.results}
                    auctions={auctions}
                    deleteAuction={deleteAuction}
                />
            )}
        </Page>
    );
};

AuctionsList.propTypes = {
    auctions: PropTypes.array.isRequired,
    getAuctionList: PropTypes.func.isRequired,
    deleteAuction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    auctions: state.auction.auctions,
});

export default connect(mapStateToProps, { getAuctionList, deleteAuction })(
    AuctionsList
);
