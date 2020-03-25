import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "./actions/alert";

function TestComponent({ alerts, setAlert }) {
    return (
        <Fragment>
            <button onClick={() => setAlert("This is a Test Alert", "danger")}>
                This is an alert Test TestComponent
            </button>
        </Fragment>
    );
}

TestComponent.propTypes = {};

const mapStateToProps = state => ({
    alerts: state.alerts
});
export default connect(mapStateToProps, { setAlert })(TestComponent);
