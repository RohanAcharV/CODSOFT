const mongoose =require("mongoose")

const employerSchema = new mongoose.Schema({
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
    company:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:null
    },
    about:{
        type:String,
        default:null
    }
    
});

const Employer =mongoose.model('Employer',employerSchema);

module.exports = Employer;