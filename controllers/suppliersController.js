const Suppliers = require('../models/suppliers');
const { validationResult } = require("express-validator");

exports.getSuppliers = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 20) || 20;
    try {
      const suppliers = await Suppliers.getSuppliers(page,limit);
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.createSupplier = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, contact, email, address }  = req.body;
      await Suppliers.createSuppliers({ name, contact, email, address });
       res.status(201).json({ message: 'Suppliers created successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };