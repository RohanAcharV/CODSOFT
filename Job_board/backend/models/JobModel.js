const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  experience: {
    type:String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  jobtype: {
    type: String,
    required: true,
  },
  aboutjob: {
    type: String,
    required: true,
  },
  responsibility: {
    type: [String], 
    required: true,
  },
  skills: {
    type: [String], 
    required: true,
  },
  criteria: {
    type: [String], 
    required: true,
  },
  perks: {
    type: [String], 
    required: true,
  },
  openings: {
    type: Number,
    required: true,
  },
  posteddate:{
    type:String,
    required:true
  },
  applicants:{
    type:Number,
    default:0
  },
  hiringstatus:{
    type:String,
    default:'hiring'
  }
});

const JobModel = mongoose.model('Job', jobSchema);

module.exports = JobModel;
