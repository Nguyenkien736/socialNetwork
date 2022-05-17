const mongoose = require("mongoose")

const savedThreadSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
        
    },
    thread_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Thread"

    },
    create_at:{
        type:Date
    }

}) 

module.exports = mongoose.model("SavedThread",savedThreadSchema) 