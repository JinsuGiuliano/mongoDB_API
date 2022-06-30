const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model").User;
db.post = require("./post.model");
db.followers = require("./followers.model");
db.following = require("./following.model");
db.chats = require("./chat.model");
db.notificattion = require("./notification.model");

module.exports = db;
