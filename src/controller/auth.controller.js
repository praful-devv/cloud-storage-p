const userModel = require("../models/auth.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerController = async(req,res)=>{
    const {username,email,password,bio,profile_image} = req.body

    const isUserExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserExists){
        return res.status(409).json({
            message:isUserExists.email == email?"user already exists":"username is already taken"
        })
    }

    const hash = await bcrypt.hash(password,12)

    const user = await userModel.create({
        username,email,password:hash,profile_image,bio
    })

    const token = await jwt.sign({
        id:user._id
    },process.env.JWT_SECRETS,{expiresIn:"1h"})

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user created successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profile_image:user.profile_image,
        }
    })

}

module.exports = {registerController}