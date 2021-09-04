import { MOSAIC_LIST_REQUEST, 
        MOSAIC_LIST_SUCCESS, 
        MOSAIC_LIST_FAIL, 
        MOSAIC_DETAILS_REQUEST, 
        MOSAIC_DETAILS_SUCCESS, 
        MOSAIC_DETAILS_FAIL 
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