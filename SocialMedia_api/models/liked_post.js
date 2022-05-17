//{userId, postID}

const mongoose = require("mongoose")

const likedPostSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
        
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Post"

    }

}) 
module.exports = mongoose.model("LikedPost",likedPostSchema) 