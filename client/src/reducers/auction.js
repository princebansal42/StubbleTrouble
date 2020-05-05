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
} from "../actions/types";

const initialState = {
    auctions: [],
    auction: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUCTION_LIST_REQUEST:
        case AUCTION_REQUEST:
        case AUCTION_ADD_REQUEST:
        case AUCTION_EDIT_REQUEST:
        case AUCTION_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case AUCTION_LIST_SUCCESS:
            return {
                ...state,
                auctions: payload,
                loading: false,
            };

        case AUCTION_LIST_FAILURE:
            return {
                ...state,
                auctions: [],
                auction: null,
                loading: false,
            };

        case AUCTION_SUCCESS:
            return {
                ...state,
                auction: payload,
                loading: false,
            };

        case AUCTION_ADD_SUCCESS:
            return {
                ...state,
                auctions: [...state.auctions, { ...payload }],
                auction: payload,
                loading: false,
            };

        case AUCTION_DELETE_SUCCESS:
            return {
                ...state,
                auctions: state.auctions.filter(
                    (auction) => auction._id !== payload
                ),
                auction: null,
                loading: false,
            };
        case AUCTION_FAILURE:
        case AUCTION_ADD_FAILURE:
        case AUCTION_DELETE_FAILURE:
            return {
                ...state,
                auction: null,
                loading: false,
            };

        case AUCTION_EDIT_SUCCESS:
            return {
                ...state,
                auctions: state.auctions.map((auction) => {
                    if (auction._id === payload._id) return payload;
                    return auction;
                }),
                auction: payload,
                loading: false,
            };
        case AUCTION_EDIT_FAILURE:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
}
