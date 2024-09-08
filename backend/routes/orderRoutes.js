const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('user');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
