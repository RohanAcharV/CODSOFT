const mongoose =require("mongoose")

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:null
    },
    resume:{
        type:String,
        default:null
    }
});

const User =mongoose.model('User',userSchema);

module.exports = User;