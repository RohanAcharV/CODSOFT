const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobid: {
    type: String,
    required: true,
  },
  userid: {
    type: String, // Reference to the User model
    required: true,
  },
  status:{
    type:String,
    default:'pending'
  },
  applieddate:{
    type:String,
    required:true
  }
});

const ApplicationModel = mongoose.model('Application', applicationSchema);

module.exports = ApplicationModel;
