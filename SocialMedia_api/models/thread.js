// {threadID, creator, media, firstPostID, catID}

const mongoose = require("mongoose")

const threadSchema = new mongoose.Schema({
    creator_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
        
    },
    firstpost_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"

    },
    tittle:{
        type:String,
        required:true
    },
    create_at:{
        type: Date
    },
    update_at:{
        type:Date
    }

}) 
module.exports = mongoose.model("Thread",threadSchema) 