import express from 'express';
import dotenv from 'dotenv';
import mosaics from './data/mosaics.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/mosaics', (req, res) => {
    res.json(mosaics);
});

app.get('/api/mosaics/:id', (req, res) => {
    const mosaic = mosaics.find(m => m._id === req.params.id);
    res.json(mosaic);
});

const PORT = process.env.PORT || 5000;

app. listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);