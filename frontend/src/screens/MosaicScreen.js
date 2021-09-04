import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMosaicDetails } from '../actions/mosaicActions.js';

const MosaicScreen = ({ match }) => {
    const dispatch = useDispatch();
    
    const mosaicDetails = useSelector(state => state.mosaicDetails);
    const { loading, error, mosaic } = mosaicDetails;
    
    useEffect(() => {
        dispatch(listMosaicDetails(match.params.id));
    }, [dispatch, match]);
    
    return (
        <>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading 
                ? <Loader />
                : error
                ? <Message variant='danger'>{error}</Message>
                : (
                    <Row>
                        <Col md={6}>
                            <Image src={mosaic.image} alt={mosaic.caption} fluid></Image>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3 className='mosaic-caption'>{mosaic.caption}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {mosaic.author} 
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={mosaic.rating} text={`${mosaic.numReviews} reviews`} ></Rating>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: {mosaic.price} &euro;
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Materials: {mosaic.materials}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price: 
                                            </Col>
                                            <Col>
                                                <strong>{mosaic.price} &euro;</strong> 
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status: 
                                            </Col>
                                            <Col>
                                                {mosaic.countInStock > 0 ? 'In Stock' : 'Out of Stock'} 
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button className='btn-block' type='button' disabled={mosaic.countInStock === 0}>
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row> 
                )
            }            
        </>
    )
};

export default MosaicScreen;
