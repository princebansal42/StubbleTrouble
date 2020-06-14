import axios from "axios";
import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILURE,
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILURE,
    ORDER_EDIT_REQUEST,
    ORDER_EDIT_SUCCESS,
    ORDER_EDIT_FAILURE,
} from "./types";

// import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";

// Get Order
export const getOrderList = () => async (dispatch) => {
    dispatch({
        type: ORDER_LIST_REQUEST,
    });
    try {
        const res = await axios.get("/api/orders");
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: ORDER_LIST_FAILURE,
        });
    }
};

// Get Order
export const getOrder = (id) => async (dispatch) => {
    dispatch({
        type: ORDER_REQUEST,
    });
    try {
        const res = await axios.get(`/api/orders/${id}`);
        dispatch({
            type: ORDER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: ORDER_FAILURE,
        });
    }
};

// Add Address

export const addAddress = (id, address) => async (dispatch) => {
    dispatch({
        type: ORDER_EDIT_REQUEST,
    });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ address });
    try {
        const res = await axios.put(`/api/orders/${id}/address`, body, config);
        dispatch({
            type: ORDER_EDIT_SUCCESS,
            payload: res.data,
        });
        dispatch(setAlert("Address added to order.", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: ORDER_EDIT_FAILURE,
        });
        dispatch(setAlert("Not able to add address to order.", "error"));
    }
};
