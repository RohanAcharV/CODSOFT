const UserModel = require("../models/UserModel")
const bcrypt = require('bcrypt');


module.exports.updatephotoresume = async (req,res) => {
    try {
    const {email,photo,resume}=req.body;
      const user = await UserModel.findOne({ email });
  
      user.photo = photo;
      user.resume = resume;
  

      await user.save();
  
      res.status(200).json({ message: 'Photo/Resume updated successfully' });
    } catch (error) {
  
      console.error('Error in updating photo/resumme', error);
      res.status(500).json({ error: 'Failed to update photo/resume' });
    }
  };

  module.exports.fetchuserdetails=async(req,res)=>{
    const {userids} = req.body;
    
  try {
  const userdetails = await UserModel.find({ _id: { $in: userids } }, { fname: 1, lname:1, photo:1 , email:1, resume:1 });
  
  res.status(200).json({ message: 'User details fetched successfully', userdetails });
    
  } catch (error) {
  console.error('Error fetching user details:', error);
  res.status(500).json({ error: 'Failed to fetch userdetails' });
}
  }

  module.exports.saveuser = async(req,res)=>{
    try {
 
        const userData = req.body;
        const existingUser = await UserModel.findOne({ email: userData.email });

    if (existingUser) {
      return res.status(200).json({ success: false, message: 'User already exists' });
    }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        const user = new UserModel(userData);

      await user.save();
      
        res.status(200).json({ success:true,message: 'user saved successfully'});
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Failed to save user' });
      }
}


module.exports.checkuser = async (req,res) => {
    try {
    const {email,password}=req.body;
      const user = await UserModel.findOne({ email });
  
      if (!user) {
       return res.status(200).json({ error: 'User not found' ,message:'User not found',success:false});
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

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


module.exports.getphotoresume=async(req,res)=>{
  try{
    const {email}=req.body;

    const user=await UserModel.findOne({email})

    const photo = user.photo || null;
    const resume = user.resume || null;

    const data = { photo, resume }
    res.status(200).json({message: 'Fetched successfully' ,data});
  }
  catch(error){
    console.error('Error while fetching photo/resume:', error);
    return res.status(500).json({ error: 'fetching photo/resume failed' });
  }
}

module.exports.getnameid=async(req,res)=>{
  try{
    const {email}=req.body;
    // console.log(email)
    if(email==='null' || email==undefined)
      return res.status(200).json({message:'No matches found'})

    const user=await UserModel.findOne({email})
    const photo = user.photo || null;
    const userdata = { photo: photo, id:user._id,fname:user.fname }
    res.status(200).json({message: 'Fetched successfully' ,userdata});
  }
  catch(error){
    console.error('Error while fetching idname', error);
    return res.status(500).json({ error: 'fetching idname failed' });
  }
}