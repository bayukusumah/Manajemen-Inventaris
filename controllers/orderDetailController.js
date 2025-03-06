const OrderDetail = require('../models/orderDetail');
const { validationResult } = require("express-validator");

exports.getOrderDetail = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 20) || 20;
    try {
      const stocks = await OrderDetail.getOrderDetail(page,limit);
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.createOrderDetail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { order_id, product_id, quantity,price }  = req.body;
      await OrderDetail.createOrderDetail({ order_id, product_id, quantity,price });
       res.status(201).json({ message: 'Order Detail created successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };