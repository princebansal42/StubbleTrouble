import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "./Alert";
const AlertList = ({ alerts }) => {
    return (
        <Fragment>
            {alerts !== null &&
                alerts.length > 0 &&
                alerts.map(alert => (
                    <Alert
                        key={alert.id}
                        alertType={alert.alertType}
                        msg={alert.msg}
                    />
                ))}
        </Fragment>
    );
};

AlertList.propTypes = {};

const mapStateToProps = state => ({
    alerts: state.alert
});
export default connect(mapStateToProps)(AlertList);
