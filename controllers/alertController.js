const Alert = require('../models/alert');
const { validationResult } = require("express-validator");

exports.getAlert = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 20) || 20;
    try {
      const alert = await Alert.getAlert(page,limit);
      res.json(alert);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.createAlert = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {  }  = req.body;
      await Alert.createAlert({ product_id, threshold,alert_message });
       res.status(201).json({message:'Invetory Alert created successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };