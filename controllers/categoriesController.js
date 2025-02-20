const Categories = require('../models/categories');
const { validationResult } = require("express-validator");

exports.getCategories = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 20) || 20;
    try {
      const categories = await Categories.getCategories(page,limit);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.createCategories = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, description }  = req.body;
      await Categories.createCategories({ name, description });
       res.status(201).json({ message: 'Categories created successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };