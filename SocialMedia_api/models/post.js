//{postId, creator, threadID, prePostID,nextPostIDList, content, timestamp, likeCount, point, comments}




const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    creator_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
        
    },
    thread_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Thread"
        
    },
    prepost_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
        
    },
    nextpost_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
        
    },
    body:{
        type:String,
        default:""
    },
    create_at:{
        type: Date
    },
    update_at:{
        type:Date
    }

}) 
module.exports = mongoose.model("Post",postSchema) 