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
} from "../actions/types";

const initialState = {
    orders: [],
    order: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ORDER_LIST_REQUEST:
        case ORDER_REQUEST:
        case ORDER_EDIT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_LIST_SUCCESS:
            return {
                ...state,
                orders: payload,
                loading: false,
            };

        case ORDER_LIST_FAILURE:
            return {
                ...state,
                orders: [],
                order: null,
                loading: false,
            };
        case ORDER_EDIT_SUCCESS:
        case ORDER_SUCCESS:
            return {
                ...state,
                order: payload,
                loading: false,
            };

        case ORDER_FAILURE:
        case ORDER_EDIT_FAILURE:
            return {
                ...state,
                order: null,
                loading: false,
            };

        default:
            return state;
    }
}
