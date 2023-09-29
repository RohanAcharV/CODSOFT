const ApplicationModel = require("../models/ApplicationModel")

  module.exports.saveapplication = async(req,res)=>{
    try {
 
        const applicationData = req.body;
        const application = new ApplicationModel(applicationData);
        await application.save();
    
        res.status(200).json({ success:true,message: 'Application saved successfully' });
      } catch (error) {
        console.error('Error saving application:', error);
        res.status(500).json({ error: 'Failed to save application' });
      }
}


module.exports.checkapplication = async(req,res)=>{
    try {
        
        const {jobid,userid} = req.body;
        const application=await ApplicationModel.findOne({jobid,userid})
        if(application)
        res.status(200).json({ success:true,message: 'Application exists' });
        else
        res.status(200).json({ success:false,message: 'Application does not exist' });
      } catch (error) {
        console.error('Error in checking application:', error);
        res.status(500).json({ error: 'Failed to check application' });
      }
}


module.exports.getapplications_user = async (req, res) => {
    try {
      const { userid } = req.body;
      const applications = await ApplicationModel.find({ userid },{jobid:1,status:1,applieddate:1});
      
  
      res.status(200).json({ success: true, applications});
    } catch (error) {
      console.error('Error fetching jobids for userid:', error);
      res.status(500).json({ error: 'Failed to fetch jobids for userid' });
    }
  };
  

  module.exports.getapplications_employer = async (req, res) => {
    try {
      const { jobid } = req.body;
      const applications = await ApplicationModel.find({ jobid },{userid:1,status:1});
      
      res.status(200).json({ success: true, applications});
    } catch (error) {
      console.error('Error fetching userids for jobid:', error);
      res.status(500).json({ error: 'Failed to fetch userids for jobid' });
    }
  };
  

  module.exports.updateapplicationstatus = async(req,res)=>{
    try {
        
        const {jobid,userid,status} = req.body;
        await ApplicationModel.updateOne({jobid,userid},{$set:{status:status}})
        
        res.status(200).json({ success:true,message: 'Application status updated successfully ' });
      } catch (error) {
        console.error('Error in status updating', error);
        res.status(500).json({ error: 'status updatation failed' });
      }
}

module.exports.rejectapplications = async (req, res) => {
  try {
    const { jobid } = req.body;
  await ApplicationModel.updateMany({ jobid, status: { $ne: 'selected' } },{ $set: { status: 'rejected' } } 
    );

    res.status(200).json({ success: true, message: 'Applications for the specified job updated to "rejected"' });
  } catch (error) {
    console.error('Error updating application statuses:', error);
    res.status(500).json({ error: 'Status update failed' });
  }
};