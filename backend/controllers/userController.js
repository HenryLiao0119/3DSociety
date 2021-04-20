import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

//@desc   Auth user & get token
//@route  POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  // grab data from body
  const { email, password } = req.body;

  // check user
  const user = await User.findOne({ email });

  // confirm user and send the token to login
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

//@desc   Get user profile
//@route  GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // find user
  const user = await User.findById(req.user._id);

  // if found send back the user info
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc   Register a new user
//@route  POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  // grab the data that was send here through req.body
  const { name, email, password } = req.body;

  // check if it exist
  const userExists = await User.findOne({ email });

  // if it is,send error
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // else make a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // send the new user back with token to login
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc   update user profile
//@route  PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // get user by id
  const user = await User.findById(req.user._id);

  // if user exist, change the info by the new info or stay the same
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    //save updated user
    const updateUser = await user.save();

    // return updated user info with new token
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
