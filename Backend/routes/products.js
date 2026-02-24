const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { products: mockProducts } = require('../data/mockData');

// GET all products
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.warn('Database query failed, falling back to mock data. Error:', err.message);
        res.json(mockProducts);
    }
});

// GET product by ID (increments viewCount for demand tracking)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.warn('Database query failed, falling back to mock data. Error:', err.message);
        const product = mockProducts.find(p => String(p.id) === String(req.params.id));
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Simulate demand tracking on mock data
        product.viewCount = (product.viewCount || 0) + 1;
        res.json(product);
    }
});

module.exports = router;
