const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  editUserProfile,
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

module.exports = router;
