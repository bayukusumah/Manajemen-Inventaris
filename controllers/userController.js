const User = require('../models/user');
const { validationResult } = require("express-validator");

exports.getUsers = async(req,res) =>{
    try{
      const users = await User.getUsers();
      res.json(users);
    }catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getListUsers = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  try {  
    const users = await User.getAllUsers(page, limit);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { username, email, password, role } = req.body;
    await User.createUser({ username, email, password, role });
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
