const express = require("express")
const authController = require("../controller/auth.controller")

const Router = express.Router()

Router.post("/register",authController.registerController)

module.exports = Router