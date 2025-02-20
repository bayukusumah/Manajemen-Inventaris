const Produk = require('../models/produk');
const { validationResult } = require("express-validator");

exports.getProduk = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 20) || 20;
  try {
    const produk = await Produk.getProduk(page,limit);
    res.json(produk);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduk = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, description, price, stock, category_id, supplier_id }  = req.body;
    await Produk.createProduk({ name, description, price, stock, category_id, supplier_id } );
     res.status(201).json({ message: 'Produk created successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};