const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  editUserProfile,
  getFavorites,
  toggleFavorite,
} = require("../controllers/userController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// requireAuth for edit route
router.use(requireAuth);

// edit route
router.patch("/edit-profile", editUserProfile);

// Get favorites route
router.get("/favorites", getFavorites);

// Toggle favorite route
router.patch("/favorites", toggleFavorite);

module.exports = router;
