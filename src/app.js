const express = require("express")

const app = express()
const Router = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")

app.use(express.json())
app.use("/api/auth",Router)
app.use("/api/post",postRouter)

module.exports = app