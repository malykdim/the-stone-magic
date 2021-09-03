import axios from 'axios';

import { MOSAIC_LIST_REQUEST, MOSAIC_LIST_SUCCESS, MOSAIC_LIST_FAIL } from '../constants/mosaicConstants.js';

export const listMosaics = () => async (dispatch) => {
    try {
        dispatch({ type: MOSAIC_LIST_REQUEST });
        
        const { data } = await axios.get('/api/mosaics');
        
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