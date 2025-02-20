const Transactions = require('../models/transactions');
const { validationResult } = require("express-validator");

exports.getTransactions = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 20) || 20;
    try {
      const transactions = await Transactions.getTransactions(page,limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.createTransactions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { product_id, user_id, type, quantity, total_price }  = req.body;
      await Transactions.createTransactions({ product_id, user_id, type, quantity, total_price });
       res.status(201).json({ message: 'Transactions created successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };