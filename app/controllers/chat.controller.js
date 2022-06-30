const db = require("../models");
const { findOneAndUpdate } = require("../models/post.model");
const Chat = db.chats;
const User = db.user;
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.ChatCreate = async (req, res) => {
  // #swagger.tags = ['Chats']
  try {
    const data = req.body;
    const chat = await new Chat({
      messages: [],
      by: data.by,
      to: data.to,
    });
    chat.save();
    await User.findOneAndUpdate(
      { _id: req.body.by },
      { $push: { chats: chat._id.toString() } }
    );
    await User.findOneAndUpdate(
      { _id: req.body.to },
      { $push: { chats: chat._id.toString() } }
    );
    res.status(200).json({
      status: "success",
      data: chat,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.ChatMessage = async (req, res, next) => {
  // #swagger.tags = ['Chats']
  try {
    const data = req.body;
    const chat = await Chat.findOneAndUpdate(
      { _id: data.chatId },
      {
        $push: {
          messages: { text: data.text, createdAt: data.createdAt },
        },
      }
    );

    if (!chat) {
      return next(new AppError("Chat Not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: chat,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error while creating Chat",
      message: err.message,
    });
  }
};

exports.ChatRetrieveById = async (req, res) => {
  // #swagger.tags = ['Chats']
  try {
    const chat = await Chat.findOne({ _id: res.params.id });

    if (!chat) {
      return next(new AppError("Chat Not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: chat,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.ChatDeleteById = async (req, res, next) => {
  try {
    // #swagger.tags = ['Chats']
    const data = req.body;
    const chat = await Chat.findOneAndDelete({ _id: data.id });

    if (!chat) {
      return next(new AppError("Chat Not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: chat,
    });
    await User.findOneAndUpdate(
      { _id: chat.by },
      { $pull: { chats: data.id } }
    );
    await User.findOneAndUpdate(
      { _id: chat.to },
      { $pull: { chats: data.id } }
    );
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
