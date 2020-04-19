import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOAD_USER,
    AUTH_ERROR,
    LOGOUT,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

// load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get("/api/auth");

            dispatch({
                type: LOAD_USER,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
            });
	    console.log(err.response.data.errors);
        }
    } else dispatch({ type: AUTH_ERROR });
};

// Register User
export const register = ({ name, email, password, userType }) => async (
    dispatch
) => {
    dispatch({
        type: REGISTER_REQUEST,
    });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    console.log(
        `name : ${name}, email: ${email}, password: ${password}, userType: ${userType}`
    );
    const body = JSON.stringify({ name, email, password, userType });
    try {
        const res = await axios.post("/api/users", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: REGISTER_FAILURE,
        });
    }
};

// Login User
export const login = (email, password) => async (dispatch) => {
    dispatch({
        type: LOGIN_REQUEST,
    });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/api/login", body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);

        dispatch({
            type: LOGIN_FAILURE,
        });
    }
};

// Logout

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
};
