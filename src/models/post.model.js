const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    post_image:{
        type:String,
        require:true
    },
    caption:String,
    createdBy:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId
    }

})

const postModel = mongoose.model("post",postSchema)

module.exports = postModel