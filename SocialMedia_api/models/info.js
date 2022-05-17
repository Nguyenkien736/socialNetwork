// schema{userId,name, age, gender, email, phone, location}

const mongoose = require("mongoose")

const InfoSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
        unique:true
    },
    name:{
        type:String
    },
    dob:{
        type:Date
    },
    email:{
        type:String
    },
    gender:{
        type: Boolean
    },
    phone:{
        type:String
    }

}) 
module.exports = mongoose.model("Info",InfoSchema) 