import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import FormContainer from '../components/FormContainer.js';
import { listMosaicDetails, updateMosaic } from '../actions/mosaicActions.js';
import { MOSAIC_UPDATE_RESET } from '../constants/mosaicConstants.js';

const MosaicEditScreen = ({ match, history }) => {
    const mosaicId = match.params.id;
    
    const [caption, setCaption] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [price, setPrice] = useState(0);
    const [width, setWidth] = useState(75);
    const [height, setHeight] = useState(75);
    const [materials, setMaterials] = useState([]);
    const [countInStock, setCountInStock] = useState(1);
    
    const dispatch = useDispatch();
    
    const mosaicDetails = useSelector(state => state.mosaicDetails);
    const { loading, error, mosaic} = mosaicDetails;
    
    const mosaicUpdate = useSelector(state => state.mosaicUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = mosaicUpdate;
    
    // const mosaicUpdate = useSelector(state => state.mosaicUpdate);
    // const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = mosaicUpdate;
    
    useEffect(() => {
        if (successUpdate) {
            dispatch( {type: MOSAIC_UPDATE_RESET} );
            history.push('/admin/productlist');
        } else {
            if (!mosaic.caption || mosaic._id !== mosaicId) {
                dispatch(listMosaicDetails(mosaicId));
            } else {
                setCaption(mosaic.caption);
                setAuthor(mosaic.author);
                setImage(mosaic.image);
                setPrice(mosaic.price);
                setWidth(mosaic.width);
                setHeight(mosaic.height);
                setMaterials(mosaic.materials);
                setCountInStock(mosaic.countInStock);
            }
        }  
    }, [dispatch, history, mosaicId, mosaic, successUpdate]);
    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            
            const { data } = await axios.post('/api/upload', formData, config);
            
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };
    
    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateMosaic({ 
            _id: mosaicId, 
            caption, 
            author, 
            image, 
            price, 
            width, 
            height, 
            materials, 
            countInStock 
        }));        
    };
    
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>      
            <FormContainer>
                <h1 className="heading">Edit Panneau</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading 
                    ? <Loader /> 
                    : error 
                    ? <Message variant='danger'>{error}</Message> 
                    : (
                        <Form onSubmit={submitHandler}>
                            
                            <Form.Group controlId='caption'>
                                <Form.Label>Caption</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter caption' 
                                    value={caption} 
                                    onChange={(e) => setCaption(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='author'>
                                <Form.Label>Author</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter author' 
                                    value={author} 
                                    onChange={(e) => setAuthor(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text' 
                                    placeholder= 'Enter image URL'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>
                                <Form.File 
                                    id='image-file' 
                                    label='Choose File' 
                                    custom 
                                    onChange={uploadFileHandler}                                
                                ></Form.File>
                                {uploading && <Loader />}
                            </Form.Group>                            
                            
                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number' 
                                    placeholder= 'Assign a price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                                                        
                            <Form.Group controlId='width'>
                                <Form.Label>Width</Form.Label>
                                <Form.Control
                                    type='number' 
                                    placeholder= 'Width'
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                ></Form.Control>
                            </Form.Group>                            
                                                        
                            <Form.Group controlId='height'>
                                <Form.Label>Height</Form.Label>
                                <Form.Control
                                    type='number' 
                                    placeholder= 'Height'
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                ></Form.Control>
                            </Form.Group> 
                            
                            <Form.Group controlId='materials'>
                                <Form.Label>Materials</Form.Label>
                                <Form.Control
                                    type='checkbox'
                                    label='marbel' 
                                    checked={materials}
                                    onChange={(e) => setMaterials(e.target.checked)}
                                ></Form.Control>
                            </Form.Group>
                                                       
                            <Form.Group controlId='countInStock'>
                                <Form.Label>Count in Stock</Form.Label>
                                <Form.Control
                                    type='number' 
                                    placeholder= 'Count in Stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>                            
                            
                            <Button type='submit' variant='primary'>Update</Button>
                            
                        </Form>                        
                    )
                }                
            </FormContainer>
        </>
    )
};

export default MosaicEditScreen;