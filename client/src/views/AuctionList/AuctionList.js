import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import { Page } from "components";
import { Header, Results } from "./components";
import { getFarmList, deleteFarm } from "actions/farms";

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
    const { getFarmList, farms, deleteFarm, auth} = props;

    useEffect(() => {
        let mounted = true;

        getFarmList();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <Page className={classes.root} title='Customer Management List'>
            <Header auth={auth} />

            {farms && (
                <Results
                    className={classes.results}
                    auctions={farms}
                    deleteFarm={deleteFarm}
                />
            )}
        </Page>
    );
};

AuctionsList.propTypes = {
    farms: PropTypes.array.isRequired,
    getFarmList: PropTypes.func.isRequired,
    deleteFarm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    farms: state.farm.farms,
});

export default connect(mapStateToProps, { getFarmList, deleteFarm })(
    AuctionsList
);
