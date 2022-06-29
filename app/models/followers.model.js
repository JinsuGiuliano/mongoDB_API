const mongoose = require("mongoose");

const FollowersSchema = new mongoose.Schema({
      userId: {type: String, unique: true },
      followers: [{ type: String }]
  })

const Followers = mongoose.model(
  "Followers",
FollowersSchema
);

module.exports = Followers;