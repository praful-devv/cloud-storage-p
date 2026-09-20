const express = require("express")

const app = express()
const Router = require("./routes/auth.routes")

app.use(express.json())
app.use("/api/auth",Router)

module.exports = app