const mongoose = require("mongoose");
const { UserSchema } = require('./user.model')

const ChatSchema = new mongoose.Schema({
    messages: [{
        createdAt: { type: Date, default: Date.now() },
        text: { type: String }
    }],
    by: { type: String },
    to: { type: String },
    createdAt: { type: Date, default: Date.now() }
  })

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;