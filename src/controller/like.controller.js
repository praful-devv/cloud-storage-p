const likeModel = require("../models/like.model")
const postModel = require("../models/post.model")

const PostLikeController = async(req,res)=>{

    const userId = req.user.id
    const postId = req.params.id

    const isPostExists = await postModel.findOne({_id:postId})

    if(!isPostExists){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const isPostAlreadyLike = await likeModel.findOne({
        likeBy:userId,
        likeTo:isPostExists._id
    })

    if(isPostAlreadyLike){
        return res.status(409).json({
            message:"you already like this post"
        })
    }

    const likepost = await likeModel.create({
        likeBy:userId,
        likeTo:isPostExists._id
    })

    res.status(201).json({
        message:"you like the post",
        likepost
    })

}

const PostUnLikeController = async(req,res)=>{

    const userId = req.user.id
    const postId = req.params.id

    const isPostExists = await postModel.findOne({
        _id:postId
    })

    if(!isPostExists){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const isPostLike  = await likeModel.findOne({
        likeBy:userId,
        likeTo:isPostExists._id
    })

    if(!isPostLike){
        return res.status(409).json({
            message:"you already unlike poat"
        })
    }

    const unLikePost = await likeModel.findByIdAndDelete(isPostLike._id);

    res.status(200).json({
        message:"you unlike the post",
        unLikePost
    })

}

module.exports = {PostLikeController,PostUnLikeController}