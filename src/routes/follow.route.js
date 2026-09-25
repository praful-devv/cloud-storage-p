const express = require("express")
const followController = require("../controller/follow.controller")
const identifyUser = require("../middleware/auth.middleware")

const followRouter = express.Router()

followRouter.post("/:id",identifyUser,followController.followToUserController)
followRouter.delete("/:id",identifyUser,followController.unfollowToUserController)

module.exports = followRouter