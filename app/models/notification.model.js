const mongoose = require("mongoose");


const NotificationSchema = new mongoose.Schema({
    userId: {type: String},
    messages: {type: Number },
    alerts: { type: Number },
    saved: { type: Number },
  },
);

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;