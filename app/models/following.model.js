const mongoose = require("mongoose");

const FollowingSchema = new mongoose.Schema({
      userId: {type: String, unique: true },
      following: [{ type: String}]
  })


const Following = mongoose.model(
  "Following", FollowingSchema );

module.exports = Following;