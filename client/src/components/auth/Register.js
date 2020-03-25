import React, { useState } from "react";
import PropTypes from "prop-types";

import { Link, Redirect } from "react-router-dom";
import "./Auth.css";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { connect } from "react-redux";

const Register = ({ register, setAlert, auth: { isAuthenticated } }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        userType: "farmer"
    });

    if (isAuthenticated) return <Redirect to='/dashboard' />;

    const { name, email, password, password2, userType } = formData;
    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== password2) console.log("Password Do not Match");
        else register({ name, email, password, userType });
    };
    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                                type='text'
                                name='name'
                                id='name'
                                value={name}
                                onChange={e => handleChange(e)}
                            />
                            <label htmlFor='name'>Enter your username</label>
                        </div>
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

                    <div className='row'>
                        <div className='input-field col s12'>
                            <input
                                className='validate'
                                type='password'
                                name='password2'
                                id='password2'
                                value={password2}
                                onChange={e => handleChange(e)}
                            />
                            <label htmlFor='password2'>
                                Enter password again
                            </label>
                        </div>
                    </div>

                    <div className='row'>
                        <p>
                            <label>
                                <input
                                    name='userType'
                                    type='radio'
                                    value='farmer'
                                    checked={userType === "farmer"}
                                    onChange={e => handleChange(e)}
                                />
                                <span>Farmer</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input
                                    name='userType'
                                    type='radio'
                                    value='buyer'
                                    checked={userType === "buyer"}
                                    onChange={e => handleChange(e)}
                                />
                                <span>Buyer</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input
                                    name='userType'
                                    type='radio'
                                    value='logistics'
                                    checked={userType === "logistics"}
                                    onChange={e => handleChange(e)}
                                />
                                <span>Logistics</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input
                                    name='userType'
                                    type='radio'
                                    value='admin'
                                    checked={userType === "admin"}
                                    onChange={e => handleChange(e)}
                                />
                                <span>Admin</span>
                            </label>
                        </p>
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

Register.propTypes = {
    auth: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { setAlert, register })(Register);
