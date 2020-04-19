import React, { Fragment, Suspense } from "react";
import { renderRoutes } from "react-router-config";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { LinearProgress } from "@material-ui/core";

import { Topbar } from "./components";

import { Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    content: {
        height: "100%",
        paddingTop: 56,
        [theme.breakpoints.up("sm")]: {
            paddingTop: 64,
        },
    },
}));

const Auth = (props) => {
    const { route, isAuthenticated } = props;

    const classes = useStyles();
    if (isAuthenticated) return <Redirect to='/dashboard' />;
    return (
        <Fragment>
            <Topbar />
            <main className={classes.content}>
                <Suspense fallback={<LinearProgress />}>
                    {renderRoutes(route.routes)}
                </Suspense>
            </main>
        </Fragment>
    );
};

Auth.propTypes = {
    route: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Auth);
