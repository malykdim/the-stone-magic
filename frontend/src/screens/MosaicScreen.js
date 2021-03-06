import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMosaicDetails, createMosaicReview } from '../actions/mosaicActions.js';
import { MOSAIC_CREATE_REVIEW_RESET } from '../constants/mosaicConstants.js';

const MosaicScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    
    const dispatch = useDispatch();
    
    const mosaicDetails = useSelector(state => state.mosaicDetails);
    const { loading, error, mosaic } = mosaicDetails;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    const mosaicCreateReview = useSelector(state => state.mosaicCreateReview);
    const { success: successMosaicReview, error: errorMosaicReview } = mosaicCreateReview;
    
    useEffect(() => {
        if (successMosaicReview) {
            alert('Review Submitted!');
            setRating(0);
            setComment('');
            dispatch({ type: MOSAIC_CREATE_REVIEW_RESET });
        }
        
        dispatch(listMosaicDetails(match.params.id));
    }, [dispatch, match, successMosaicReview]);
    
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };
    
    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(createMosaicReview(match.params.id, { rating, comment }));
    };
    
    return (
        <>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading 
                ? <Loader />
                : error
                ? <Message variant='danger'>{error}</Message>
                : (
                    <>
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
                                    
                                    {mosaic.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control 
                                                        as='select' 
                                                        value={qty} 
                                                        onChange={e => setQty(e.target.value)}
                                                    >
                                                        {[...Array(mosaic.countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ) }
                                    
                                    <ListGroup.Item>
                                        <Button 
                                            onClick={addToCartHandler}
                                            className='btn-block' 
                                            type='button' 
                                            disabled={mosaic.countInStock === 0}
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row> 
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {mosaic.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {mosaic.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>
                                            &nbsp;
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>
                                            {review.comment}
                                        </p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h4>Write a Customer Review</h4>
                                    {errorMosaicReview && <Message variant='danger'>{errorMosaicReview}</Message>}
                                    {userInfo 
                                        ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                        <option value=''>Select...</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Very Good</option>
                                                        <option value='5'>5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                                </Form.Group>
                                                <Button type='submit' variant='primary'>Submit</Button>
                                            </Form>
                                        ) 
                                        : <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review
                                        </Message>
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    </>
                )
            }            
        </>
    )
};

export default MosaicScreen;
