const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, username, password) {
  // Check if the email or username is already in use
  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });

  // Validation
  if (emailExists) {
    throw Error("Email already in use");
  }
  if (usernameExists) {
    throw Error("Username already in use");
  }
  if (!email || !username || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password not strong enough. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }
  if (!validator.isLength(username, { min: 3, max: 25 })) {
    throw Error("Username must be between 3 and 25 characters long");
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw Error("Username can only contain letters, numbers, and underscores");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create the user
  const user = await this.create({ email, username, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (identifier, password) {
  if (!identifier || !password) {
    throw Error("All fields must be filled");
  }

  // Find user by either email or username
  const user = await this.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    throw Error("Invalid email/username");
  }

  // Compare the password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

// Static edit user profile method
userSchema.statics.editProfile = async function (
  userId,
  { email, username, password }
) {
  // Validate input
  if (!userId) {
    throw Error("User ID must be provided");
  }

  // Find the user by ID
  const user = await this.findById(userId);

  if (!user) {
    throw Error("User not found");
  }

  // Check if the new email is already in use
  if (email && (await this.findOne({ email }))) {
    throw Error("Email already in use");
  }

  // Check if the new username is already in use
  if (username && (await this.findOne({ username }))) {
    throw Error("Username already in use");
  }

  // Update fields
  if (email) {
    if (!validator.isEmail(email)) {
      throw Error("Email not valid");
    }
    user.email = email;
  }

  if (username) {
    if (!validator.isLength(username, { min: 3, max: 25 })) {
      throw Error("Username must be between 3 and 25 characters long");
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw Error(
        "Username can only contain letters, numbers, and underscores"
      );
    }
    user.username = username;
  }

  if (password) {
    if (!validator.isStrongPassword(password)) {
      throw Error(
        "Password not strong enough. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
  }

  // Save the updated user
  await user.save();

  return user;
};

module.exports = mongoose.model("User", userSchema);
