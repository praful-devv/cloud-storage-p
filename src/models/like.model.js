const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    likeBy:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    likeTo:{
        ref:"post",
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})

likeSchema.index({likeBy:1,likeTo:1},{unique:true})

const likeModel = mongoose.model("like",likeSchema)

module.exports = likeModel