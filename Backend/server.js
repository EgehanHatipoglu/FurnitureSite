const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const productsRoute = require('./routes/products');

// Use Routes
app.use('/api/products', productsRoute);

// Basic connection test route
app.get('/', (req, res) => {
    res.send('Backend Server is Running!');
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    console.log('Test URL: http://localhost:' + PORT);
    console.log('Products API: http://localhost:' + PORT + '/api/products');
});
