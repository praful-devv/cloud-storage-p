const postModel = require("../models/post.model")
const imagekit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const IMAGEKIT = new imagekit({
  private: process.env.IMAGEKIT_PRIVATE_KEY
})
const createpostController = async(req,res)=>{

    const file = await IMAGEKIT.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"xyz"
    })

    res.status(201).json({
        message:"post upload",
    })

}

module.exports = { createpostController };