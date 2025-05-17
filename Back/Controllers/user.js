const { CatchAsync } = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");
const usersModel = require("../Models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = CatchAsync(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    throw new AppError(400, "Username, email and password are required");
  }

  // Check if the email already exists
  const existingUser = await usersModel.findOne({ email });
  if (existingUser) {
    throw new AppError(400, "Email already exists");
  }

  // Check if the username already exists
  const existingUsername = await usersModel.findOne({ username });
  if (existingUsername) {
    throw new AppError(400, "Username already exists");
  }

  // Create new user - password will be hashed by the pre-save hook
  const user = await usersModel.create({
    username,
    email,
    password, // No need to hash here - the schema pre-save hook will do it
    role,
  });

  // Send response without sending the password
  res.status(201).json({
    status: "success",
    data: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

exports.loginUser = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return next(new AppError(400, "Email and password are required"));
  }

  // Find user - make sure password field is included
  const user = await usersModel.findOne({ email });
  if (!user) {
    return next(new AppError(400, "Invalid email or password"));
  }

  try {
    // Compare password with stored hash
    // Important: We need to use compare instead of direct hashing because
    // bcrypt uses a salt that's stored as part of the hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new AppError(400, "Invalid email or password"));
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from environment variables");
      return next(new AppError(500, "Internal Server Error"));
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      token,
      role: user.role,
    });
  } catch (err) {
    console.error("Authentication error:", err);
    return next(new AppError(500, "Authentication failed"));
  }
});
