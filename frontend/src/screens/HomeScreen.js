import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Mosaic from '../components/Mosaic.js';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { listMosaics } from '../actions/mosaicActions.js';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    
    const dispatch = useDispatch();
    
    const mosaicList = useSelector(state => state.mosaicList);
    const { loading, error, mosaics } = mosaicList;
    
    useEffect(() => {
        dispatch(listMosaics(keyword));
    }, [dispatch, keyword]);
    
    return (
        <>
            <h1>Latest Panneaux</h1>
            {loading 
                ? <Loader /> 
                : error 
                ? <Message variant='danger'>{error}</Message> 
                : <Row>
                    {mosaics.map((mosaic) => (
                        <Col key={mosaic._id} sm={12} md={6} lg={4} xl={3}>
                            <Mosaic mosaic={mosaic}/>
                        </Col>
                    ))}
                </Row>
            }            
        </>
    )
}

export default HomeScreen
