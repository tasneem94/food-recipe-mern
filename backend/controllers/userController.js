const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login a user
const loginUser = async (req, res) => {
  const { identifier, password } = req.body; // Changed from 'email' to 'identifier'

  try {
    const user = await User.login(identifier, password); // 'identifier' can be either email or username

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ username: user.username, email: user.email, token }); // Return both email and username
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup a user
const signupUser = async (req, res) => {
  const { email, username, password } = req.body; // Include 'username' in the request body

  try {
    const user = await User.signup(email, username, password); // Pass 'username' to the signup method

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ username: user.username, email: user.email, token }); // Return both email and username
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit user profile
const editUserProfile = async (req, res) => {
  const userId = req.user._id; //got it from middleware
  const { email, username, password } = req.body;

  try {
    const updatedUser = await User.editProfile(userId, {
      email,
      username,
      password,
    });

    // Create a new token after profile update
    const token = createToken(updatedUser._id);

    // Respond with updated user info and the new token
    res.status(200).json({
      username: updatedUser.username,
      email: updatedUser.email,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user favorites
const getFavorites = async (req, res) => {
  const userId = req.user._id; // Get the user ID from middleware

  try {
    const favorites = await User.getFavorites(userId);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Toggle user favorites
const toggleFavorite = async (req, res) => {
  const userId = req.user._id; // Get the user ID from middleware
  const favoriteItem = req.body; // Expecting { id, publisher, title, image_url }

  try {
    const updatedFavorites = await User.toggleFavorite(userId, favoriteItem);
    res.status(200).json(updatedFavorites); // Return updated favorites
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  editUserProfile,
  getFavorites,
  toggleFavorite,
};
