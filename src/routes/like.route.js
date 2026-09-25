const express = require("express")
const identifyUser = require("../middleware/auth.middleware")
const likeController = require("../controller/like.controller")
const likeRouter = express.Router()

likeRouter.post("/:id",identifyUser,likeController.PostLikeController)
likeRouter.delete("/:id",identifyUser,likeController.PostUnLikeController)

module.exports = likeRouter