const express = require("express")
const postController = require("../controller/post.controller")
const postRouter = express.Router()
const multer = require("multer");
const upload =  multer({ storage: multer.memoryStorage() });

postRouter.post("/",upload.single("post_image"),postController.createpostController)

module.exports = postRouter