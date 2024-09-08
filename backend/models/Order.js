const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ name: String, quantity: Number }], // Customize as per your product structure
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
