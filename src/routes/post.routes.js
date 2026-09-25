const express = require("express")
const postController = require("../controller/post.controller")
const postRouter = express.Router()
const identifyUser = require("../middleware/auth.middleware")
const multer = require("multer");
const upload =  multer({ storage: multer.memoryStorage() });

postRouter.post("/",upload.single("post_image"),identifyUser,postController.createpostController)

postRouter.get("/",identifyUser,postController.getPostController)

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)

module.exports = postRouter