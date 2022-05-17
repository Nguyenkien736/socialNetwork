//{group_name, group_id, memberList(userId),group_threadIDs}

const mongoose = require("mongoose")

const GroupSchema = new mongoose.Schema({
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    tittle:{
        type:String,
        required: true
    }
    ,
    create_at:{
        type: Date
    }
    

}) 
module.exports = mongoose.model("Group",GroupSchema) 