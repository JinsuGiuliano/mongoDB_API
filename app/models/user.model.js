const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
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
    createdAt: { type: Date, default: Date.now() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
UserSchema.virtual("timeAsUser").get(function () {
  return Date.now() - this.createdAt;
});

const User = mongoose.model("User", UserSchema);
module.exports = { User, UserSchema };
