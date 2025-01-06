const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add username'],
    },
    email: {
      type: String,
      required: [true, 'Please add user email'],
      unique: [true, 'Email address is already registered'],
    },
    password: {
      type: String,
      required: [true, 'Please add user password'],
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model is already compiled before defining it again
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
