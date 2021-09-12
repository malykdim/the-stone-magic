import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import FormContainer from '../components/FormContainer.js';
import { getUserDetails, updateUser } from '../actions/userActions.js';
import { USER_UPDATE_RESET } from '../constants/userConstants.js';

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    
    const dispatch = useDispatch();
    
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user} = userDetails;
    
    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;
    
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/admin/userlist');
        } else {
            if (!user.username || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setUsername(user.username);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }            
        }        
    }, [dispatch, history, userId, user, successUpdate]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(updateUser({ _id: userId, username, email, isAdmin }));        
    }
    
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>      
            <FormContainer>
                <h1 className="heading">Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading 
                    ? <Loader /> 
                    : error 
                    ? <Message variant='danger'>{error}</Message> 
                    : (
                        <Form onSubmit={submitHandler}>
                            
                            <Form.Group controlId='username'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter username' 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type='email' 
                                    placeholder='Enter email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='isadmin'>
                                <Form.Check 
                                    type='checkbox' 
                                    label='Is Admin' 
                                    checked={isAdmin} 
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                ></Form.Check>
                            </Form.Group>                            
                            
                            <Button type='submit' variant='primary'>Update</Button>
                            
                        </Form>                        
                    )
                }                
            </FormContainer>
        </>
    )
};

export default UserEditScreen;