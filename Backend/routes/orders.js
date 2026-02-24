const express = require('express');
const router = express.Router();
const { orders } = require('../data/mockData');

// POST /api/orders — Create a new order
router.post('/', (req, res) => {
    const { userId, items, shippingInfo, totalAmount } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Sipariş için ürün gereklidir.' });
    }

    const orderId = `ORN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const statuses = ['Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi'];

    const newOrder = {
        id: orderId,
        userId: userId || 'guest',
        items,
        shippingInfo,
        totalAmount,
        status: 'Hazırlanıyor',
        statusStep: 0, // 0=Hazırlanıyor, 1=Kargoya Verildi, 2=Teslim Edildi
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR'),
    };

    orders.push(newOrder);

    res.status(201).json({ order: newOrder, message: 'Siparişiniz başarıyla oluşturuldu.' });
});

// GET /api/orders/:userId — Get all orders for a user
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const userOrders = orders.filter(o => o.userId === userId);
    res.json(userOrders.reverse()); // newest first
});

// GET /api/orders — Get all orders (for testing)
router.get('/', (req, res) => {
    res.json(orders.reverse());
});

module.exports = router;
