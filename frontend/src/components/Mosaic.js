import React from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Mosaic = ({mosaic}) => {
    return (
        <Card className="card my-3 p-3 rounded">
            <Link to={`/panneau/${mosaic._id}`}>
                <Card.Img src={mosaic.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/panneau/${mosaic._id}`}>
                    <Card.Title as='div'><strong>{mosaic.caption}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <div className="author">
                        {mosaic.author}
                    </div>
                </Card.Text>
                <Card.Text as='div'>
                    <Rating value={mosaic.rating} text={`${mosaic.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as='h2'>
                    <div className="price">
                        {mosaic.price} &euro;
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
};

export default Mosaic;
