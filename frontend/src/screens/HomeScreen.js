import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Mosaic from '../components/Mosaic';
import axios from 'axios';

const HomeScreen = () => {
    const [mosaics, setMosaics] = useState([]);
    
    useEffect(() => {
        const fetchMosaics = async () => {
            const { data } = await axios.get('/api/mosaics');
            
            setMosaics(data);
        };
        
        fetchMosaics();
    }, []);
    
    return (
        <>
            <h1>Latest Panneaux</h1>
            <Row>
                {mosaics.map((mosaic) => (
                    <Col key={mosaic._id} sm={12} md={6} lg={4} xl={3}>
                        <Mosaic mosaic={mosaic}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
