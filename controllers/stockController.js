const Stock = require('../models/stock');
const { validationResult } = require("express-validator");

exports.getStock = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 20) || 20;
    try {
      const stocks = await Stock.getStock(page,limit);
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.createStock = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { product_id, transaction_id, previous_stock, new_stock }  = req.body;
      await Stock.createStock({ product_id, transaction_id, previous_stock, new_stock });
       res.status(201).json({ message: 'Stock created successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };