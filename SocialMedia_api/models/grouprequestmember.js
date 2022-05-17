

const mongoose = require("mongoose")

const GrouprequestmemberSchema = new mongoose.Schema({
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
    Status:{
        type:Boolean
    }

}) 
module.exports = mongoose.model("Grouprequestmember",GrouprequestmemberSchema) 