import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILURE,
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILURE,
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

        case ORDER_SUCCESS:
            return {
                ...state,
                order: payload,
                loading: false,
            };

        case ORDER_FAILURE:
            return {
                ...state,
                order: null,
                loading: false,
            };

        default:
            return state;
    }
}
