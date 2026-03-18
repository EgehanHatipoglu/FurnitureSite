const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased for base64 image uploads in AI route

// Import Routes
const productsRoute = require('./routes/products');
const authRoute = require('./routes/auth');
const ordersRoute = require('./routes/orders');
const aiRoute = require('./routes/ai');

// Use Routes
app.use('/api/products', productsRoute);
app.use('/api/auth', authRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/ai', aiRoute);

// Basic connection test route
app.get('/', (req, res) => {
    res.send('Backend Server is Running!');
});

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    console.log('Test URL:      http://localhost:' + PORT);
    console.log('Products API:  http://localhost:' + PORT + '/api/products');
    console.log('Auth API:      http://localhost:' + PORT + '/api/auth');
    console.log('Orders API:    http://localhost:' + PORT + '/api/orders');
    console.log('AI API:        http://localhost:' + PORT + '/api/ai');
});
