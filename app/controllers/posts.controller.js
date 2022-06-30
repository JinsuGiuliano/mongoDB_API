const db = require("../models");
const User = db.user;
const Post = db.post;

const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const fillUpPosts = async function (allPosts) {
  const posts = [];
  for (let i in allPosts) {
    let user = await User.findById(allPosts[i].createdBy);
    let obj = {
      ...allPosts[i]._doc,
      createdBy: {
        userId: user._id.toString(),
        name: user.google.name,
        email: user.google.email,
        photo: user.google.photo,
      },
    };

    posts.push({ ...obj });
  }
  return posts;
};

exports.PostCreate = async (req, res) => {
  try {
    const data = req.body;
    const post = await new Post({
      caption: data.caption,
      createdBy: data.createdBy,
      downloadUrl: data.dowloadUrl,
      file: data.file,
      likesCount: data.likesCount,
    });

    post.save();

    res.status(200).json({
      status: "success",
      data: req.body,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.PostsAll = async (req, res) => {
  try {
    const allPosts = await Post.find().limit(20).sort({ createdAt: -1 });
    //    .cache({ key: req.user.google.id});

    const posts = await fillUpPosts(allPosts);
    res.status(200).json({
      status: "success",
      result: posts.length,
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.PostsByUserId = async (req, res) => {
  try {
    const allPosts = await Post.find({ createdBy: req.body.userId });
    // .cache({ key: req.user.google.id});

    if (!allPosts) {
      return next(new AppError("No post found with that ID", 404));
    }
    const posts = await fillUpPosts(allPosts);
    res.status(200).json({
      status: "success",
      result: posts.length,
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.PostById = async (req, res) => {
  try {
    const post = await Post.findOne(
      { _id: req.body.id },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!post) {
      return next(new AppError("No post found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      result: 1,
      data: post,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.PostUpdateById = async (req, res) => {
  try {
    const postUdated = await Post.findByIdAndUpdate(
      req.body.id,
      {
        caption: req.body.caption,
        createdBy: req.body.createdBy,
        downloadUrl: req.body.dowloadUrl,
        createdAt: req.body.createdAt,
        file: req.body.file,
        likesCount: req.body.likesCount,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!postUdated) {
      return next(new AppError("No post found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      result: 1,
      data: postUdated,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.PostDelete = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.body.id, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return next(new AppError("No post found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: "Post with Id " + req.body.id + " has been deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.PostLike = async (req, res) => {
  try {
    const postUdated = await Post.findByIdAndUpdate(
      req.body.id,
      {
        $inc: {
          likesCount: 1,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!postUdated) {
      return next(new AppError("No post found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      result: 1,
      data: postUdated,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.PostDislike = async (req, res) => {
  try {
    const postUdated = await Post.findByIdAndUpdate(
      req.body.id,
      {
        $inc: {
          likesCount: -1,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!postUdated) {
      return next(new AppError("No post found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      result: 1,
      data: postUdated,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.LatestPost = async (req, res) => {
  try {
    const allPosts = await Post.find(
      { createdAt: { $gt: req.body.lastDate } },
      {
        new: true,
        runValidators: true,
      }
    )
      .limit(20)
      .sort({ createdAt: -1 });
    //    .cache({ key: req.user.google.id});

    const posts = await fillUpPosts(allPosts);
    res.status(200).json({
      status: "success",
      result: posts.length,
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
