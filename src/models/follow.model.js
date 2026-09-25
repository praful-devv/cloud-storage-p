const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    following: {
      required: true, 
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
    },
    followers: {
      required: true,
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
)

followSchema.index({following:1,followers:1},{unique:true})

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel
