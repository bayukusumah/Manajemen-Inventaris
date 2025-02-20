const express = require('express');
const produkController = require('../controllers/produkController');
const router = express.Router();
const { body } = require("express-validator");

router.get('/list', produkController.getProduk);
router.post('/send',
    [
        body("name").notEmpty().withMessage("Nama produk wajib diisi"),
        body("category_id").isInt().withMessage("Kategori harus berupa angka"),
        body('supplier_id').isInt().withMessage('Supplier ID must be an integer'),
        body("price").isFloat({ gt: 0 }).withMessage("Harga harus lebih dari 0"),
        body("stock").isInt({ min: 0 }).withMessage("Stok tidak boleh negatif"),
       
      ], produkController.createProduk);

module.exports = router;
