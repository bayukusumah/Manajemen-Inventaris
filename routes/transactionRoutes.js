const express = require('express');
const transactionsController = require('../controllers/transactionsController');
const router = express.Router();
const { body } = require("express-validator");

router.get('/list', transactionsController.getTransactions);
router.post('/send',[
    body('product_id').isInt().withMessage('Product ID harus berupa angka'),
    body('user_id').isInt().withMessage('User ID harus berupa angka'),
    body('type').isIn(['in', 'out']).withMessage('Type harus antara in atau out'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity harus berupa angka'),
    body('total_price').isDecimal().withMessage('Total price harus berupa angka')
], transactionsController.createTransactions);

module.exports = router;
