const express = require('express');
const orderDetailController = require('../controllers/orderDetailController');
const router = express.Router();
const { body } = require("express-validator");

router.get('/list', orderDetailController.getOrderDetail);
router.post('/send',[
    body('order_id').isInt().withMessage('Order ID harus berupa angka'),
    body('product_id').isInt().withMessage('Product ID harus berupa angka'),
    body('quantity').isInt().withMessage('Quantity harus berupa angka'),
    body('price').isInt().withMessage('Price harus berupa angka'),
], orderDetailController.createOrderDetail);

module.exports = router;