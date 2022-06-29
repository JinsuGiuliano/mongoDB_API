const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String },
  google: {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    photo: { type: String },
  },
  followers: { type: Number },
  following: { type: Number },
  chats: [{ type: String }],
  categories: [{ type: String }],
  photoBg: { type: String },
});

const User = mongoose.model("User", UserSchema);
module.exports = { User, UserSchema };
