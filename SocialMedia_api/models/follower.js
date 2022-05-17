
const mongoose = require("mongoose")

const followerSchema = new mongoose.Schema({
    sourceId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
        
    },
    targetId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
        
    },
    create_at:{
        type: Date
    },
    update_at:{
        type:Date
    }

}) 
module.exports = mongoose.model("Follower",followerSchema) 