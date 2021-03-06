import axios from "axios";
import {
    AUCTION_LIST_REQUEST,
    AUCTION_LIST_SUCCESS,
    AUCTION_LIST_FAILURE,
    AUCTION_REQUEST,
    AUCTION_SUCCESS,
    AUCTION_FAILURE,
    AUCTION_ADD_REQUEST,
    AUCTION_ADD_SUCCESS,
    AUCTION_ADD_FAILURE,
    AUCTION_EDIT_REQUEST,
    AUCTION_EDIT_SUCCESS,
    AUCTION_EDIT_FAILURE,
    AUCTION_DELETE_REQUEST,
    AUCTION_DELETE_SUCCESS,
    AUCTION_DELETE_FAILURE,
    AUCTION_JOIN_REQUEST,
    AUCTION_JOIN_SUCCESS,
    AUCTION_JOIN_FAILURE,
    AUCTION_GET_BID,
} from "./types";

import { setAlert } from "actions/alert";

// Get Auctions
export const getAuctionList = () => async (dispatch) => {
    dispatch({
        type: AUCTION_LIST_REQUEST,
    });
    try {
        const res = await axios.get("/api/auctions");
        dispatch({
            type: AUCTION_LIST_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: AUCTION_LIST_FAILURE,
        });
    }
};

// Get Auction
export const getAuction = (id) => async (dispatch) => {
    dispatch({
        type: AUCTION_REQUEST,
    });
    try {
        const res = await axios.get(`/api/auctions/${id}`);
        dispatch({
            type: AUCTION_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: AUCTION_FAILURE,
        });
    }
};

// Add auction
export const addAuction = (auctionDetail) => async (dispatch) => {
    const { farm_id, description, starting_price } = auctionDetail;
    dispatch({
        type: AUCTION_ADD_REQUEST,
    });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({
        farm_id,
        description,
        starting_price,
    });

    try {
        const res = await axios.post("/api/auctions", body, config);
        dispatch({
            type: AUCTION_ADD_SUCCESS,
            payload: res.data,
        });
        dispatch(setAlert("auction added successfully", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: AUCTION_ADD_FAILURE,
        });
        dispatch(setAlert("auction addition failed", "error"));
    }
};

// Join Auction
export const joinAuction = (id) => async (dispatch) => {
    dispatch({
        type: AUCTION_JOIN_REQUEST,
    });
    console.log(id);
    try {
        const res = await axios.get(`/api/auctions/join/${id}`);
        dispatch({
            type: AUCTION_JOIN_SUCCESS,
            payload: res.data,
        });
        dispatch(setAlert("auction joined successfully", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: AUCTION_JOIN_FAILURE,
        });
        dispatch(setAlert("auction joining failed", "error"));
    }
};

// Bid Auction
export const bidAuction = (auction) => async (dispatch) => {
    console.log("THIS IS THE WNEW AUCTION OBJECT WE GOT");
    console.log(auction);

    dispatch({
        type: AUCTION_GET_BID,
        payload: auction,
    });
};

// Edit Auction
export const editAuction = (id, newAuctionDetail) => async (dispatch) => {
    const {
        farm_id,
        description,
        start_time,
        starting_price,
    } = newAuctionDetail;
    dispatch({
        type: AUCTION_EDIT_REQUEST,
    });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({
        farm_id,
        description,
        start_time,
        starting_price,
    });
    try {
        const res = await axios.put(`/api/auctions/${id}`, body, config);
        dispatch({
            type: AUCTION_EDIT_SUCCESS,
            payload: res.data,
        });
        dispatch(setAlert("auction edited successfully", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: AUCTION_EDIT_FAILURE,
        });
        dispatch(setAlert("registered successfully", "error"));
    }
};

// Delete Auction
export const deleteAuction = (id) => async (dispatch) => {
    dispatch({
        type: AUCTION_DELETE_REQUEST,
    });

    try {
        // const res =
        await axios.delete(`/api/auctions/${id}`);
        dispatch({
            type: AUCTION_DELETE_SUCCESS,
            payload: id,
        });
        dispatch(setAlert("auction deleted successfully", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
        dispatch({
            type: AUCTION_DELETE_FAILURE,
        });
        dispatch(setAlert("auction deletion failed", "error"));
    }
};
