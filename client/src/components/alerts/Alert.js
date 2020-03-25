import React from "react";
import "./Alert.css";

const Alert = ({ msg, alertType }) => {
    let color = "";
    if (alertType === "success") color = "green";
    else color = "red";
    return (
        <div className='row' id='alert_box'>
            <div className='col s12 m12'>
                <div className={`card darken-1 ${color}`}>
                    <div className='row'>
                        <div className='col s12 m10'>
                            <div className='card-content white-text'>
                                <p>{msg}</p>
                            </div>
                        </div>
                        {/* <div className='col s12 m2'>
                            <i
                                className='fa fa-times icon_style'
                                id='alert_close'
                                aria-hidden='true'
                            ></i>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;
