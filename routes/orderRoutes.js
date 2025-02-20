const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();
const { body } = require("express-validator");

router.get('/list', orderController.getOrder);
router.post('/send',[
    body('supplier_id').isInt().withMessage('Supplier ID harus berupa angka'),
    body('user_id').isInt().withMessage('User ID harus berupa angka'),
    body('status').isIn(['pending', 'completed','canceled']).withMessage('status harus antara pending, completed dan canceled'),
   
], orderController.createOrder);

module.exports = router;