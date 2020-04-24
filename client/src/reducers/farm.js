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
} from "../actions/types";

const initialState = {
    farms: [],
    farm: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FARM_LIST_REQUEST:
        case FARM_REQUEST:
        case FARM_ADD_REQUEST:
        case FARM_EDIT_REQUEST:
        case FARM_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FARM_LIST_SUCCESS:
            return {
                ...state,
                farms: payload,
                loading: false,
            };

        case FARM_LIST_FAILURE:
            return {
                ...state,
                farms: [],
                farm: null,
                loading: false,
            };

        case FARM_SUCCESS:
            return {
                ...state,
                farm: payload,
                loading: false,
            };

        case FARM_ADD_SUCCESS:
            return {
                ...state,
                farms: [...state.farms, { ...payload }],
                farm: payload,
                loading: false,
            };

        case FARM_DELETE_SUCCESS:
            return {
                ...state,
                farms: state.farms.filter((farm) => farm._id !== payload),
                farm: null,
                loading: false,
            };
        case FARM_FAILURE:
        case FARM_ADD_FAILURE:
        case FARM_DELETE_FAILURE:
            return {
                ...state,
                farm: null,
                loading: false,
            };

        case FARM_EDIT_SUCCESS:
            return {
                ...state,
                farms: state.farms.map((farm) => {
                    if (farm._id === payload._id) return payload;
                    return farm;
                }),
                farm: payload,
                loading: false,
            };
        case FARM_EDIT_FAILURE:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
}
