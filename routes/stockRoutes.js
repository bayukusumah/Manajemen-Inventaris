const express = require('express');
const stockController = require('../controllers/stockController');
const router = express.Router();
const { body } = require("express-validator");

router.get('/list', stockController.getStock);
router.post('/send',[
    body('product_id').isInt().withMessage('Product ID harus berupa angka'),
    body('transaction_id').isInt().withMessage('Transaction ID harus berupa angka'),
    body('previous_stock').isInt().withMessage('Previous stock harus berupa angka'),
    body('new_stock').isInt().withMessage('New stock harus berupa angka')
], stockController.createStock);

module.exports = router;