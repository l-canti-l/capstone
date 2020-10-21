import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../tools/generateToken.js";

//authorize user and get token, POST to api/users/login
const authenticateUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  //find user by email
  const user = await User.findOne({ email: email });
  //check if user exists
  if (user && (await user.authenticatePassword(password))) {
    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    response.status(401);
    throw new Error("Invalid email address or password");
  }
});

//register user, POST to api/users
const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body;
  //find user by email
  const userExists = await User.findOne({ email: email });
  //check if user exists
  if (userExists) {
    response.status(400);
    throw new Error("You already have an account");
  }
  //create
  const user = await User.create({
    name,
    email,
    password,
  });

  //if successful
  if (user) {
    response
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
  } else {
    response.status(400);
    throw new Error("User not found");
  }
});

//get user profile GET to api/users/profile, private route
const getProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    response.status(404);
    throw new Error("user not found");
  }
});

export { authenticateUser, getProfile, registerUser };
