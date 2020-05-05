import axios from "axios";
import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILURE,
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILURE,
} from "./types";

// import setAuthToken from "../utils/setAuthToken";

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
