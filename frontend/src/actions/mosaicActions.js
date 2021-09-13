import axios from 'axios';

import { 
    MOSAIC_LIST_REQUEST, MOSAIC_LIST_SUCCESS, MOSAIC_LIST_FAIL, 
    MOSAIC_DETAILS_REQUEST, MOSAIC_DETAILS_SUCCESS, MOSAIC_DETAILS_FAIL, 
    MOSAIC_DELETE_REQUEST, MOSAIC_DELETE_SUCCESS, MOSAIC_DELETE_FAIL 
} from '../constants/mosaicConstants.js';

export const listMosaics = () => async (dispatch) => {
    try {
        dispatch({ type: MOSAIC_LIST_REQUEST });
        
        const { data } = await axios.get('/api/products');
        
        dispatch({
            type: MOSAIC_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MOSAIC_LIST_FAIL,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        });
    }
};

export const listMosaicDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: MOSAIC_DETAILS_REQUEST });
        
        const { data } = await axios.get(`/api/products/${id}`);
        
        dispatch({
            type: MOSAIC_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MOSAIC_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        });
    }
};

export const deleteMosaic = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MOSAIC_DELETE_REQUEST
        });
        
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        await axios.delete(`/api/mosaics/${id}`, config);
        
        dispatch({
            type: MOSAIC_DELETE_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: MOSAIC_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        });
    }
}