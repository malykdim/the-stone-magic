import { MOSAIC_LIST_REQUEST, MOSAIC_LIST_SUCCESS, MOSAIC_LIST_FAIL, 
        MOSAIC_DETAILS_REQUEST, MOSAIC_DETAILS_SUCCESS, MOSAIC_DETAILS_FAIL, 
        MOSAIC_DELETE_REQUEST, MOSAIC_DELETE_SUCCESS, MOSAIC_DELETE_FAIL,
        MOSAIC_CREATE_REQUEST, MOSAIC_CREATE_SUCCESS, MOSAIC_CREATE_FAIL, MOSAIC_CREATE_RESET, 
        MOSAIC_UPDATE_REQUEST, MOSAIC_UPDATE_SUCCESS, MOSAIC_UPDATE_FAIL, MOSAIC_UPDATE_RESET, 
        MOSAIC_CREATE_REVIEW_REQUEST, MOSAIC_CREATE_REVIEW_SUCCESS, MOSAIC_CREATE_REVIEW_FAIL, MOSAIC_CREATE_REVIEW_RESET
} from '../constants/mosaicConstants.js';

export const mosaicListReducer = (state = { mosaics: [] }, action) => {
    switch (action.type) {
        case MOSAIC_LIST_REQUEST: return { loading: true, mosaics: [] };
        case MOSAIC_LIST_SUCCESS: return { loading: false, mosaics: action.payload };
        case MOSAIC_LIST_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};

export const mosaicDetailsReducer = (state = { mosaic: { reviews: [] } }, action) => {
    switch (action.type) {
        case MOSAIC_DETAILS_REQUEST: return { loading: true, ...state };
        case MOSAIC_DETAILS_SUCCESS: return { loading: false, mosaic: action.payload };
        case MOSAIC_DETAILS_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};

export const mosaicDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MOSAIC_DELETE_REQUEST: return { loading: true };
        case MOSAIC_DELETE_SUCCESS: return { loading: false, success: true };
        case MOSAIC_DELETE_FAIL: return { loading: false, error: action.payload };
        default: return state;
    }
};

export const mosaicCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MOSAIC_CREATE_REQUEST: return { loading: true };
        case MOSAIC_CREATE_SUCCESS: return { loading: false, success: true, mosaic: action.payload };
        case MOSAIC_CREATE_FAIL: return { loading: false, error: action.payload };
        case MOSAIC_CREATE_RESET: return {};
        default: return state;
    }
};

export const mosaicUpdateReducer = (state = { mosaic: {} }, action) => {
    switch (action.type) {
        case MOSAIC_UPDATE_REQUEST: return { loading: true };
        case MOSAIC_UPDATE_SUCCESS: return { loading: false, success: true, mosaic: action.payload };
        case MOSAIC_UPDATE_FAIL: return { loading: false, error: action.payload };
        case MOSAIC_UPDATE_RESET: return { mosaic: {} };
        default: return state;
    }
};

export const mosaicCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case MOSAIC_CREATE_REVIEW_REQUEST: return { loading: true };
        case MOSAIC_CREATE_REVIEW_SUCCESS: return { loading: false, success: true };
        case MOSAIC_CREATE_REVIEW_FAIL: return { loading: false, error: action.payload };
        case MOSAIC_CREATE_REVIEW_RESET: return {};
        default: return state;
    }
};