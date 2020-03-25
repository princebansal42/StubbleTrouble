import React from "react";
import PropTypes from "prop-types";

// Router
import { Route, Redirect } from "react-router-dom";

//Redux
import { connect } from "react-redux";

/*
    If user is Authenticated 
    Return Route component with specified path and props
    else 
    Redirect to /login path
*/

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated && !loading ? (
                <Redirect to='/login' />
            ) : (
                <Component {...props} />
            )
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);
