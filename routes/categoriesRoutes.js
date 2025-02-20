const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoriesController = require('../controllers/categoriesController');

router.get('/list', categoriesController.getCategories);
router.post('/send', 
    [
    body('name').notEmpty().isLength({ max: 100 }).withMessage('Name maksimal 100 karakter'),
    body('description').notEmpty().isLength({ max: 200 }).withMessage('description maksimal 200 karakter')
], categoriesController.createCategories);

module.exports = router;
