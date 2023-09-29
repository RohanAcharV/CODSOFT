const JobModel = require("../models/JobModel")

module.exports.savejob = async(req,res)=>{
    try {
 
        const jobData = req.body;
        const job = new JobModel(jobData);

        await job.save();
        res.status(200).json({ success:true,message: 'job saved successfully' });
      } catch (error) {
        console.error('Error saving job:', error);
        res.status(500).json({ error: 'Failed to save job' });
      }
}

module.exports.incrementjob=async(req,res)=>{
  try{
    const {jobid}=req.body;
     await JobModel.updateOne({_id:jobid},{$inc:{applicants:1}})
  }
  catch(error){
    console.error('Error in incrementing applicant:', error);
    res.status(500).json({ error: 'Failed to incrementing applicant' });
  }
}

module.exports.updatehiring=async(req,res)=>{
  try{
    const {jobid,status}=req.body;
    if(status!=null)
     {
      await JobModel.updateOne({_id:jobid},{$set:{hiringstatus:'stopped'}})
     res.status(200).json({ success:true,message: 'job status updated successfully' });
     }
     else{
      const job=await JobModel.findOne({_id:jobid})
      const hiringstatus=job.hiringstatus
      res.status(200).json({ success:true,message: 'job status ' ,jobstatus:hiringstatus });
     }
  }
  catch(error){
    console.error('Error in updating status', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
}

module.exports.fetchjobs = async(req,res)=>{
    try {
        const { email, search, number ,id ,key} = req.body;
        let jobsQuery = {};
        let projection={};

        if (email !== null && key=='employerjobs') {
          jobsQuery = { email };
          projection = {role:1,applicants:1,posteddate:1,_id:1}
        } 
        else if(email !== null && key=='employeralljobs'){
            jobsQuery={email};
            projection={}
        }
        else if(email == null && key=='searchjobs'){
          const skipnumber=(number-1)*5;
          
          jobsQuery = {$or: [
              { role: { $regex: search, $options: 'i' } },
              { company: { $regex: search, $options: 'i' } },
            ],
          };
          projection={role:1,company:1,experience:1,location:1,salary:1,jobtype:1,responsibility:1,skills:1,posteddate:1,_id:1}

          const count = await JobModel.countDocuments(jobsQuery);
          const numberofpages=Math.ceil(count/5);
          const jobsdata = await JobModel.find(jobsQuery).sort({"_id": -1}).skip(skipnumber).limit(5).select(projection);

          res.status(200).json({ success: true, jobsdata ,numberofpages });
          return;
      }
       
        else if(id!=null && key==null){
            jobsQuery={_id:id}
            projection={}
        }
        else if(key=='featuredjobs'){
          jobsQuery={}
          projection={role:1,company:1,location:1,jobtype:1,salary:1,_id:1}
          const jobsdata = await JobModel.find(jobsQuery).sort({"_id": -1}).limit(5).select(projection)
          res.status(200).json({ success: true, jobsdata});
          return;
        }

        const jobsdata = await JobModel.find(jobsQuery).select(projection);
    
        res.status(200).json({ success: true, jobsdata });
      } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch jobs' });
      }
}


module.exports.fetchjobdetails=async(req,res)=>{
  const {jobids} = req.body;
  // console.log(jobids)
try {
  const jobDetailsMap = {};
const jobdetails = await JobModel.find({ _id: { $in: jobids } }, { role: 1, company:1, applicants:1 });

jobdetails.forEach((job) => {
  jobDetailsMap[job._id] = job;
});

const orderedJobDetails = jobids.map((jobid) => jobDetailsMap[jobid]);

res.status(200).json({ message: 'Job details fetched successfully', jobdetails:orderedJobDetails });
  
} catch (error) {
console.error('Error fetching job details:', error);
res.status(500).json({ error: 'Failed to fetch jobdetails' });
}
}