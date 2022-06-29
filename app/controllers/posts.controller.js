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

exports.PostCreate = catchAsync(async (req, res) => {
  // #swagger.tags = ['Posts']
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
});

exports.PostsAll = catchAsync(async (req, res) => {
  // #swagger.tags = ['Posts']
  const allPosts = await Post.find().limit(20).sort({ createdAt: -1 });
  //    .cache({ key: req.user.google.id});

  const posts = await fillUpPosts(allPosts);
  res.status(200).json({
    status: "success",
    result: posts.length,
    data: posts,
  });
});

exports.PostsByUserId = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Posts']
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
});

exports.PostById = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Posts']
  const post = await Post.findById(req.body.id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    result: 1,
    data: post,
  });
});

exports.PostUpdateById = catchAsync(async (req, res) => {
  // #swagger.tags = ['Posts']
  const postUdated = await Post.findByIdAndUpdate(
    req.params.id,
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
});

exports.PostDelete = catchAsync(async (req, res) => {
  // #swagger.tags = ['Posts']
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: "Post with Id " + req.params.id + " has been deleted",
  });
});

exports.PostLike = catchAsync(async (req, res) => {
  // #swagger.tags = ['Posts']
  const postUdated = await Post.findByIdAndUpdate(req.body.id, {
    $inc: {
      likesCount: 1,
    },
  });

  if (!postUdated) {
    return next(new AppError("No post found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    result: 1,
    data: postUdated,
  });
});

exports.PostDislike = catchAsync(async (req, res) => {
  // #swagger.tags = ['Posts']
  const postUdated = await Post.findByIdAndUpdate(req.body.id, {
    $inc: {
      likesCount: -1,
    },
  });

  if (!postUdated) {
    return next(new AppError("No post found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    result: 1,
    data: postUdated,
  });
});

exports.LatestPost = catchAsync(async (req, res) => {
  // #swagger.tags = ['Posts']
  const allPosts = await Post.find({ createdAt: { $gt: req.body.lastDate } })
    .limit(20)
    .sort({ createdAt: -1 });
  //    .cache({ key: req.user.google.id});

  const posts = await fillUpPosts(allPosts);
  res.status(200).json({
    status: "success",
    result: posts.length,
    data: posts,
  });
});
