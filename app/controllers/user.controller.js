const db = require("../models");
const Users = db.user;
const Following = db.following;
const Followers = db.followers;
const Posts = db.post;
const catchAsync = require("../../utils/catchAsync");

exports.allUsers = catchAsync(async (req, res) => {
  // #swagger.tags = ['Users']
  const users = await Users.find();

  res.status(200).json({
    status: "success",
    result: users.length,
    data: users,
  });
});

exports.userById = catchAsync(async (req, res) => {
  // #swagger.tags = ['Users']
  const user = await Users.findOne({ _id: req.body.id });
  res.status(200).json({
    status: "success",
    result: 1,
    data: user,
  });
});

exports.userProfile = catchAsync(async (req, res) => {
  // #swagger.tags = ['Users']
  const profile = {};
  profile.user = await Users.findOne({ _id: req.body.id });
  profile.posts = await Posts.find({ createdBy: req.body.id })
    .limit(10)
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    result: 1,
    data: profile,
  });
});

exports.userUpdate = catchAsync(async (req, res) => {
  // #swagger.tags = ['Users']
  const userUpdated = await Users.findByIdAndUpdate(req.params.id, {
    google: {
      name: req.body.name,
      email: req.body.email,
    },
    categories: req.body.categories,
  });
  res.status(200).json({
    status: "success",
    result: 1,
    data: userUpdated,
  });
});

exports.followUser = catchAsync(async (req, res) => {
  // #swagger.tags = ['Users']
  const following = await Following.findOne({ userId: req.body.userId });

  if (!following.following.includes(req.body.followId)) {
    await Following.findOneAndUpdate(
      { userId: req.body.userId },
      {
        $push: { following: req.body.followId },
      }
    );
    await Followers.findOneAndUpdate(
      { userId: req.body.followId },
      {
        $push: { followers: req.body.userId },
      }
    );

    await Users.findByIdAndUpdate(req.body.userId, {
      $inc: {
        following: 1,
      },
    });

    await Users.findByIdAndUpdate(req.body.followId, {
      $inc: {
        followers: 1,
      },
    });

    res.status(200).json({
      status: "success",
      message: `You are now following user: ${req.body.followId}`,
      result: 1,
      data: req.body,
    });
  } else {
    res.status(400).json({
      status: "Error",
      result: 1,
      message: "You are currently following this user",
    });
  }
});
exports.unFollowUser = catchAsync(async (req, res) => {
  // #swagger.tags = ['Users']
  const following = await Following.findOne({ userId: req.body.userId });
  if (following.following.includes(req.body.followId)) {
    const unfollow = await Following.findOneAndUpdate(
      { userId: req.body.userId },
      {
        $pull: { following: req.body.followId },
      }
    );
    await Followers.findOneAndUpdate(
      { userId: req.body.followId },
      {
        $pull: { followers: req.body.userId },
      }
    );

    await Users.findByIdAndUpdate(req.body.userId, {
      $inc: {
        following: -1,
      },
    });

    await Users.findByIdAndUpdate(req.body.followId, {
      $inc: {
        followers: -1,
      },
    });
    await res.status(200).json({
      status: "success",
      message: `You are not following anymore to ${req.body.followId}`,
      result: 1,
      data: unfollow,
    });
  } else {
    res.status(400).json({
      status: "Error",
      result: 1,
      message: "You are not following this user yet",
    });
  }
});

exports.DeleteAllUsers = catchAsync(async (req, res) => {
  // #swagger.tags = ['Users']
  await Users.deleteMany();
  await Following.deleteMany();
  await Followers.deleteMany();
  res.status(200).json({
    status: "success",
    result: 1,
    message: "All users have been deleted",
  });
});
