const EmployerModel = require("../models/EmployerModel")
const bcrypt = require('bcrypt');


module.exports.updatephotoabout = async (req,res) => {
    try {
    const {email,photo,about}=req.body;
      const employer = await EmployerModel.findOne({ email });
  
      employer.photo = photo;
      employer.about = about;
  

      await employer.save();
  
      res.status(200).json({ message: 'Photo/About updated successfully' });
    } catch (error) {
  
      console.error('Error in updating photo/about', error);
      res.status(500).json({ error: 'Failed to update photo/about' });
    }
  };

  module.exports.saveemployer = async(req,res)=>{
    try {
 
        const employerData = req.body;
        const existingemployer = await EmployerModel.findOne({ email: employerData.email });

    if (existingemployer) {
      return res.status(200).json({ success: false, message: 'employer already exists' });
    }

        const hashedPassword = await bcrypt.hash(employerData.password, 10);
        employerData.password = hashedPassword;
        const employer = new EmployerModel(employerData);

        await employer.save();
    
        res.status(200).json({ success:true,message: 'employer saved successfully' });
      } catch (error) {
        console.error('Error saving employer:', error);
        res.status(500).json({ error: 'Failed to save employer' });
      }
}


module.exports.checkemployer = async (req,res) => {
    try {
    const {email,password}=req.body;
      const employer = await EmployerModel.findOne({ email });
  
      if (!employer) {
       return res.status(200).json({ error: 'employer not found' ,message:'employer not found',success:false});
      }

      const isPasswordValid = await bcrypt.compare(password, employer.password);

    if (isPasswordValid) {
      res.status(200).json({ success:true,message: 'success matched' });
    } else {
      res.status(200).json({ success:false,message: 'Incorrect Password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
  };


module.exports.getphotoabout=async(req,res)=>{
  try{
    const {email}=req.body;
    const employer=await EmployerModel.findOne({email})

    const photo = employer.photo || null;
    const about = employer.about ;
    const company=employer.company
    const data = {  about ,company,photo}  
    res.status(200).json({message: 'Fetched successfully' ,data});
  }
  catch(error){
    console.error('Error while fetching photo/about:', error);
    return res.status(500).json({ error: 'fetching photo/about failed' });
  }
}


module.exports.getemployernameid=async(req,res)=>{
  try{
    const {email}=req.body;
    // console.log(email)
    if(email==='null' || email==undefined)
      return res.status(200).json({message:'No matches found'})

    const user=await EmployerModel.findOne({email})
    const photo = user.photo || null;
    const employerdata = { photo: photo, id:user._id,fname:user.fname }
    res.status(200).json({message: 'Fetched successfully' ,employerdata});
  }
  catch(error){
    console.error('Error while fetching idname', error);
    return res.status(500).json({ error: 'fetching idname failed' });
  }
}