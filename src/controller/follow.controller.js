const followModel = require("../models/follow.model");
const userModel = require("../models/auth.model");

const followToUserController = async (req, res) => {
  const userId = req.user.id;
  const followToUserId = req.params.id;

  if (userId === followToUserId) {
    return res.status(400).json({
      message: "invalid request",
    });
  }

  const isUserExists = await userModel.findOne({ _id: followToUserId });

  if (!isUserExists) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isUserAlreadyFollow = await followModel.findOne({
    following: userId,
    followers: isUserExists._id,
  });

  if (isUserAlreadyFollow) {
    return res.status(409).json({
      message: "you already following this user",
    });
  }

  const follow = await followModel.create({
    following: userId,
    followers: isUserExists._id,
  });

  res.status(201).json({
    message: `you follow to ${isUserExists.username}`,
    follow,
  });
};

const unfollowToUserController = async (req, res) => {
  const userId = req.user.id;
  const followUserId = req.params.id;

  if (userId === followUserId) {
    return res.status(400).json({
      message: "invalid request",
    });
  }

  const isUserExists = await userModel.findOne({ _id: followUserId });

  if (!isUserExists) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isUserFollow = await followModel.findOne({
    following: userId,
    followers: isUserExists._id,
  });

  if (!isUserFollow) {
    return res.status(200).json({
      message: `you are not following to ${isUserExists.username}`,
    });
  }

  const unfollow = await followModel.findByIdAndDelete({
    _id: isUserFollow._id,
  });

  res.status(200).json({
    message: "you unfollow successfully",
    unfollow,
  });
};

module.exports = { followToUserController, unfollowToUserController }; 
