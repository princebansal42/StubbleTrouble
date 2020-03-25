import React, { useState } from "react";
import PropTypes from "prop-types";

import { login } from "../../actions/auth";
import { connect } from "react-redux";
import "./Auth.css";
import { Redirect } from "react-router-dom";

const Login = ({ login, auth: { isAuthenticated } }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    if (isAuthenticated) return <Redirect to='/dashboard' />;

    const { email, password } = formData;
    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className='container'>
            <div
                className='z-depth-1 grey lighten-4 row'
                style={{
                    display: "inline-block",
                    padding: "32px 48px 0px 48px",
                    border: "1px solid #EEE"
                }}
            >
                <form className='col s12' onSubmit={e => handleSubmit(e)}>
                    <div className='row'>
                        <div className='col s12'></div>
                    </div>

                    <div className='row'>
                        <div className='input-field col s12'>
                            <input
                                className='validate'
                                type='email'
                                name='email'
                                id='email'
                                value={email}
                                onChange={e => handleChange(e)}
                            />
                            <label htmlFor='email'>Enter your email</label>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='input-field col s12'>
                            <input
                                className='validate'
                                type='password'
                                name='password'
                                id='password'
                                value={password}
                                onChange={e => handleChange(e)}
                            />
                            <label htmlFor='password'>
                                Enter your password
                            </label>
                        </div>
                    </div>

                    <br />
                    <center>
                        <div className='row'>
                            <button
                                type='submit'
                                name='btn_login'
                                className='col s12 btn btn-large waves-effect indigo'
                            >
                                Login
                            </button>
                        </div>
                    </center>
                </form>
            </div>
        </div>
    );
};
Login.propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { login })(Login);
