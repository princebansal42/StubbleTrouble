import axios from "axios";
import {
    FARM_LIST_REQUEST,
    FARM_LIST_SUCCESS,
    FARM_LIST_FAILURE,
    FARM_REQUEST,
    FARM_SUCCESS,
    FARM_FAILURE,
    FARM_ADD_REQUEST,
    FARM_ADD_SUCCESS,
    FARM_ADD_FAILURE,
    FARM_EDIT_REQUEST,
    FARM_EDIT_SUCCESS,
    FARM_EDIT_FAILURE,
    FARM_DELETE_REQUEST,
    FARM_DELETE_SUCCESS,
    FARM_DELETE_FAILURE,
} from "./types";

import { setAlert } from "actions/alert";

// Get Farms
export const getFarmList = () => async (dispatch) => {
    dispatch({
        type: FARM_LIST_REQUEST,
    });
    try {
        const res = await axios.get("/api/farms");
        dispatch({
            type: FARM_LIST_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: FARM_LIST_FAILURE,
        });
    }
};

// Get farm
export const getFarm = (id) => async (dispatch) => {
    dispatch({
        type: FARM_REQUEST,
    });
    try {
        const res = await axios.get(`/api/farms/${id}`);
        dispatch({
            type: FARM_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: FARM_FAILURE,
        });
    }
};

// Add Farm
export const addFarm = (farmDetail) => async (dispatch) => {
    const {
        name,
        area,
        location: { lat, long },
        address,
    } = farmDetail;
    dispatch({
        type: FARM_ADD_REQUEST,
    });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ name, area, lat, long, address });
    console.log(lat);
    try {
        const res = await axios.post("/api/farms", body, config);
        dispatch({
            type: FARM_ADD_SUCCESS,
            payload: res.data,
        });
        dispatch(setAlert("farm added successfully", 'success'))
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: FARM_ADD_FAILURE,
        });
        dispatch(setAlert("farm addition failed", 'error'))
    }
};

// Edit Farm
export const editFarm = (id, newfarmDetail) => async (dispatch) => {
    const {
        area,
        location: { lat, long },
        address,
    } = newfarmDetail;
    dispatch({
        type: FARM_EDIT_REQUEST,
    });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ area, lat, long, address });
    try {
        const res = await axios.put(`/api/farms/${id}`, body, config);
        dispatch({
            type: FARM_EDIT_SUCCESS,
            payload: res.data,
        });
        dispatch(setAlert("farm edited successfully", 'success'))
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: FARM_EDIT_FAILURE,
        });
        dispatch(setAlert("farm edit failed", 'error'))
    }
};

// Delete Farm
export const deleteFarm = (id) => async (dispatch) => {
    dispatch({
        type: FARM_DELETE_REQUEST,
    });

    try {
        // const res =
        await axios.delete(`/api/farms/${id}`);
        dispatch({
            type: FARM_DELETE_SUCCESS,
            payload: id,
        });
        dispatch(setAlert("farm deleted successfully", 'success'))
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: FARM_DELETE_FAILURE,
        });
        dispatch(setAlert("farm deletion failed", 'error'))
    }
};
