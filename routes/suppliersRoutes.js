const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const suppliersController = require('../controllers/suppliersController');

router.get('/list', suppliersController.getSuppliers);
router.post('/send',[
    body('name')
        .notEmpty().withMessage('Name tidak boleh kosong')
        .isLength({ max: 100 }).withMessage('Name maksimal 100 karakter'),
    body('contact')
        .notEmpty().withMessage('Contact tidak boleh kosong')
        .isLength({ max: 15 }).withMessage('Contact maksimal 100 karakter')
        .isNumeric().withMessage('Contact Phone harus angka'),
    body('email')
        .notEmpty().withMessage('Email tidak boleh kosong')
        .isEmail().withMessage('Format Email tidak valid'),
    body('address')
        .notEmpty().withMessage('address tidak boleh kosong')
        .isLength({ max: 150 }).withMessage('address maksimal 150 karakter'),      
], suppliersController.createSupplier);

module.exports = router;
