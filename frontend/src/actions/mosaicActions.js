import axios from 'axios';

import { 
    MOSAIC_LIST_REQUEST, MOSAIC_LIST_SUCCESS, MOSAIC_LIST_FAIL, 
    MOSAIC_DETAILS_REQUEST, MOSAIC_DETAILS_SUCCESS, MOSAIC_DETAILS_FAIL, 
    MOSAIC_DELETE_REQUEST, MOSAIC_DELETE_SUCCESS, MOSAIC_DELETE_FAIL,
    MOSAIC_CREATE_REQUEST, MOSAIC_CREATE_SUCCESS, MOSAIC_CREATE_FAIL,  
    MOSAIC_UPDATE_REQUEST, MOSAIC_UPDATE_SUCCESS, MOSAIC_UPDATE_FAIL, 
    MOSAIC_CREATE_REVIEW_REQUEST, MOSAIC_CREATE_REVIEW_SUCCESS, MOSAIC_CREATE_REVIEW_FAIL, 
} from '../constants/mosaicConstants.js';

export const listMosaics = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: MOSAIC_LIST_REQUEST });
        
        const { data } = await axios.get(`/api/products?keyword=${keyword}`);
        
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

export const createMosaic = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MOSAIC_CREATE_REQUEST
        });
        
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.post(`/api/products`, {}, config);
        
        dispatch({
            type: MOSAIC_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MOSAIC_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        });
    }
}

export const updateMosaic = (mosaic) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MOSAIC_UPDATE_REQUEST
        });
        
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.put(`/api/products/${mosaic._id}`, mosaic, config);
        
        dispatch({
            type: MOSAIC_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MOSAIC_UPDATE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        });
    }
}

export const createMosaicReview = (mosaicId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MOSAIC_CREATE_REVIEW_REQUEST
        });
        
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        await axios.post(`/api/products/${mosaicId}/reviews`, review, config);
        
        dispatch({
            type: MOSAIC_CREATE_REVIEW_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: MOSAIC_CREATE_REVIEW_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        });
    }
}