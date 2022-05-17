

const mongoose = require("mongoose")

const GroupmemberSchema = new mongoose.Schema({
    group_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required:true
    },
    thread_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Thread",
        required:true,
        unique:true
    }

}) 
module.exports = mongoose.model("Groupthread",GroupmemberSchema) 