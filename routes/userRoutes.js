const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { body } = require("express-validator");

router.get('/list', userController.getListUsers);
router.post('/send', [
    body("username").notEmpty().withMessage("Username wajib diisi"),
    body("email").isEmail().withMessage("Email tidak valid"),
    body("password").isLength({ min: 6 }).withMessage("Password minimal 6 karakter"),
    body("role").isIn(["admin", "staff", "manager"]).withMessage("Role tidak valid"),
  ],userController.createUser);

module.exports = router;
