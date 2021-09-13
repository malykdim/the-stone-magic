import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { listMosaics, deleteMosaic } from '../actions/mosaicActions.js';

const MosaicListScreen = ({ history, match }) => {
    const dispatch = useDispatch();
    
    const mosaicList = useSelector(state => state.mosaicList);
    const { loading, error, mosaics } = mosaicList;
    
    const mosaicDelete = useSelector(state => state.mosaicDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = mosaicDelete;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listMosaics());
        } else {
            history.push('/login');
        }      
    }, [dispatch, history, userInfo, successDelete]);
    
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteMosaic(id));            
        }
    };
    
    const createMosaicHandler = (mosaic) => {
        // create mosaic
    };
    
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Panneaux</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createMosaicHandler}>
                        <i className='fas fa-plus'></i> Create Panneau
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading 
                ? <Loader /> 
                : error 
                ? <Message variant='danger'>{error}</Message> 
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>CAPTION</th>
                                <th>AUTHOR</th>
                                <th>PRICE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {mosaics.map(mosaic => (
                                <tr key={mosaic._id}>
                                    <td>{mosaic._id}</td>
                                    <td>{mosaic.caption}</td>
                                    <td>
                                        {mosaic.author}
                                    </td>
                                    <td>
                                        {mosaic.price} &euro;
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${mosaic._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        
                                        <Button 
                                            variant='danger' 
                                            className='btn-sm' 
                                            onClick={() => deleteHandler(mosaic._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
};

export default MosaicListScreen;
