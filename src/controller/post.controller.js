const postModel = require("../models/post.model");
const imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const IMAGEKIT = new imagekit({
  private: process.env.IMAGEKIT_PRIVATE_KEY,
});
const jwt = require("jsonwebtoken");

const createpostController = async (req, res) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }

  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRETS);
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }

  const file = await IMAGEKIT.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "xyz",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    post_image: file.url,
    createdBy: decode.id,
  });

  res.status(201).json({
    message: "post upload",
  });
};

const getPostController = async (req, res) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }

  let decode;
  try {
    decode = await jwt.verify(token, process.env.JWT_SECRETS);
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }

  const userId = decode.id;

  const post = await postModel.find({
    createdBy: userId,
  });

  res.status(200).json({
    message: "fetched successfully",
    post,
  });
};

const getPostDetailsController = async (req, res) => {
  const token = req.cookies.jwt_token;
  const postId = req.params.postId;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }

  let decode;
  try {
    decode = await jwt.verify(token, process.env.JWT_SECRETS);
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }

  const userId = decode.id;

  const post = await postModel.findById(postId);

  if(!post){
    return res.status(404).json({
      message:"post not found"
    })
  }

  const isValidUser = userId === post.createdBy.toString();

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  return res.status(200).json({
    message: "get post details successfully",
    post,
  });
};

module.exports = {
  createpostController,
  getPostController,
  getPostDetailsController,
};
