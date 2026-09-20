const express = require("express")
const authController = require("../controller/auth.controller")

const Router = express.Router()

Router.post("/register",authController.registerController)

Router.post("/login",authController.loginController)

module.exports = Router