const Log = require('../models/log');
const { validationResult } = require("express-validator");

exports.getLog = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 20) || 20;
    try {
      const stocks = await Log.getLog(page,limit);
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.createLog = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {  }  = req.body;
      await Log.createLog({ user_id, action });
       res.status(201).json({message: 'LOg created successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };