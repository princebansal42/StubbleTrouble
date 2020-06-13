import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Alert } from "components";

const Alerts = ({ alerts }) => {

  return (
    <ul className="alerts">
      {alerts.map(alert => {
        const { id } = alert;
        return (
          <Alert key={id} message={alert.msg} variant={alert.alertType}/>
        );
      })}
    </ul>
  );
};

Alerts.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.object).isRequired
};


const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, null)(Alerts);
