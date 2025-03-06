const express = require('express');
const alertController = require('../controllers/alertController');
const router = express.Router();
const { body } = require("express-validator");

router.get('/list', alertController.getAlert);
router.post('/send',[
    body('product_id').isInt().withMessage('user ID harus berupa angka'),
    body('threshold').isInt().withMessage('Threshold harus berupa angka'),
    body('alert_message').isString().withMessage('Alert Message harus berupa text')
], alertController.createAlert);

module.exports = router;