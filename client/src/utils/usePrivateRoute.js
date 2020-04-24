import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const usePrivateRoute = (Component) => {
    const AuthComponent = (props) => {
        return props.isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to='/auth/login' />
        );
    };

    AuthComponent.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    };
    const mapStateToProps = (state) => ({
        isAuthenticated: state.auth.isAuthenticated,
    });
    return connect(mapStateToProps)(AuthComponent);
};

export default usePrivateRoute;
