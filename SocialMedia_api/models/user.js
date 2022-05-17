// private
// public
// saved
// info
// friends
// watched threads
// story
// interesting catagories



const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required: true,
        min:6
    },
    cover_photo:{
        type:String
    },
    profile_picture:{
        type:String
    },
    create_at:{
        type: Date
    },
    update_at:{
        type:Date
    },
    isAdmin:{
        type:Boolean
    }

}) 
module.exports = mongoose.model("User",UserSchema) 