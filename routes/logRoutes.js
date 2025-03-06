const express = require('express');
const logController = require('../controllers/logController');
const router = express.Router();
const { body } = require("express-validator");

router.get('/list', logController.getLog);
router.post('/send',[
    body('user_id').isInt().withMessage('user ID harus berupa angka'),
    body('action').isString().withMessage('Action harus berupa text'),
], logController.createLog);

module.exports = router;