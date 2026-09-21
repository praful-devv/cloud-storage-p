const express = require("express")

const app = express()
const Router = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",Router)
app.use("/api/post",postRouter)
module.exports = app