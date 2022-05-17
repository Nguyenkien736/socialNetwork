

const mongoose = require("mongoose")

const GroupmemberSchema = new mongoose.Schema({
    group_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required:true,
    },
    User_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    Role:{
        type:String,
        required:true
    },
    Status:{
        type:Boolean
    }

}) 
module.exports = mongoose.model("Groupmember",GroupmemberSchema) 