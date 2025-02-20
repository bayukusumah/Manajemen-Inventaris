const Order = require('../models/order');
const { validationResult } = require("express-validator");

exports.getOrder = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 20) || 20;
    try {
      const stocks = await Order.getOrder(page,limit);
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.createOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { supplier_id, user_id, status }  = req.body;
      await Order.createOrder({ supplier_id, user_id, status });
       res.status(201).json({ message: 'Order created successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };