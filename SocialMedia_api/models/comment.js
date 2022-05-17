//{ post_Id , user_id, timeCreated}


const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Post"
        
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
        
    },
    comment:{
        type:String
    },
    create_at:{
        type: Date
    },
    update_at:{
        type:Date
    }

}) 
module.exports = mongoose.model("Comment",commentSchema) 