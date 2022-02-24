const asyncHandler = require('express-async-handler');
const Model__user = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//@desc   register_new__user
//@route  POST /api/users
//@acces  Public
const register__User = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //Check if user exists
  const user__Exists = await Model__user.findOne({ email });
  if (user__Exists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await Model__user.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc   authenticate__user
//@route  POST /api/users/login
//@acces  Public
const login__User = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Model__user.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

//@desc   Get user data__user
//@route  GET /api/users/me
//@acces  Private
const get__Me = asyncHandler(async (req, res) => {
  const { _id, name, email } = await Model__user.findById(req.user.id);

  res.status(200).json({ id: _id, name, email });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  register__User,
  login__User,
  get__Me,
};
