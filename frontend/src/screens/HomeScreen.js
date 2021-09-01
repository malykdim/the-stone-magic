import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Mosaic from '../components/Mosaic';
import mosaics from '../mosaics';

const HomeScreen = () => {
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
