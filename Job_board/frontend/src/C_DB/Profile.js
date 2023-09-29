import React from "react";
import { Avatar , Box,  Typography ,Button, Dialog, DialogContent, DialogActions} from "@mui/material";
import { useState ,useEffect} from "react";
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' 
});

function ResumeDialog({open,onClose}){
    return(
        <Dialog open={open} onClose={()=>onClose()}>
        <DialogContent sx={{display:'flex',alignItems:'center'}}> <WarningIcon color="error"/> &nbsp;Please upload a resume first</DialogContent>
        <DialogActions>
          <Button onClick={()=>onClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    )
}

function Profile({email,fname}){

    useEffect(() => {
      fetchphotoresume();
    }, []);

    const fetchphotoresume = async () => {
      try {
        const response = await api.post("/getphotoresume",{email});
        
        setImage(response.data.data.photo)
        setPdf(response.data.data.resume)

      } catch (error) {
        console.error('Error fetching photo/resume', error);
      }
    }
    const [edit,setedit]=useState(false);
    const [pdf, setPdf] = useState(null);
    const [image, setImage] = useState(null);
    const [open,setopen]=useState(false);





function OpenResume(){
    if(pdf===null)
    {
      setopen(true);
        return;
    }
    window.open(pdf, '_blank');
}

const handleEdit=async(e)=>{
  const updatedata={email,photo:image,resume:pdf}

  try{
    await api.post('updatephotoresume',updatedata);
    fetchphotoresume();
  }
  catch{
    console.log('Error in updating Photo/Resume')
  }

  setedit(false);
}

function replaceImageURL(url) {
  if (url.startsWith("https://drive.google.com/")) {
    const fileIdMatch = url.match(/\/d\/([^/]+)/);
    if (fileIdMatch && fileIdMatch.length >= 2) {
      const fileId = fileIdMatch[1];
      const newURL = `https://drive.google.com/uc?id=${fileId}`;
      
      setImage(newURL)  
      return;
    }
  }
    setImage(url)
    return;
}

    return(
        <div id="applicant_profile">
        <Box sx={{backgroundColor:'aliceblue', padding:'10vh 0'}}>
            <Box >
                <Box display={'flex'} justifyContent={'center'}>
                    {edit?
                    (
                   
                    <div>
                       <Avatar src={image} sx={{width:{xs:150,sm:200,md:250},height:{xs:150,sm:200,md:250}}} ></Avatar>

                       <Typography sx={{fontSize:{xs:'18px',sm:'22px'},fontWeight:'bold'}}>Enter Image Link<br /><input type="text" name="photo" value={image} style={{minWidth:'230px',height:'40px',textAlign:'center',fontSize:'16px',color:'blue'}} onChange={(e)=>replaceImageURL(e.target.value)}/></Typography>
                    
                    </div>

                    ):(<Avatar src={image} sx={{width:{xs:150,sm:200,md:250},height:{xs:150,sm:200,md:250}}}/>)
                    
                }
                
                </Box>
               {
                edit ?(<></>):( <><Typography textAlign={'center'} marginTop={'2vh'}sx={{fontSize:{xs:'18px',sm:'25px'},fontWeight:'bold'}}>{fname}</Typography>
                <Typography textAlign={'center'} marginTop={'1vh'}sx={{fontSize:{xs:'14px',sm:'18px'},color:'blue'}}>{email}</Typography></>)
               }
                <Box sx={{display:'flex', flexDirection:'column',alignItems:'center',textAlign:'center',margin:'auto'}}>
                <Box>
                {edit?(
                <div>
                       <Box sx={{marginTop:'5vh'}}>
                <Typography sx={{fontSize:{xs:'18px',sm:'22px'},fontWeight:'bold'}}>Enter Resume Link<br /><input type="text" name="resume" value={pdf} style={{minWidth:'230px',height:'40px',textAlign:'center',fontSize:'16px',color:'blue'}} onChange={(e)=>setPdf(e.target.value)}/></Typography>
                <Button variant="outlined" sx={{marginTop:'2vh',fontWeight:'bold'}} onClick={()=>OpenResume()}>View Resume</Button>
                </Box>
                </div>
                ):( 
                
                <Button variant="outlined" sx={{marginTop:'5vh',fontWeight:'bold'}} onClick={()=>OpenResume()}>View Resume</Button>
                )}
                <ResumeDialog open={open} onClose={()=>setopen(false)}/>
                </Box>
                </Box>
            </Box>
            {
                edit?
                (<Button variant="contained" sx={{display:'block' , margin:'5vh auto',width:'150px'}} onClick={()=>handleEdit()}>Save</Button>):
                (<Button variant="contained" sx={{display:'block' , margin:'5vh auto',width:'150px'}} onClick={()=>setedit(true)}>Edit</Button>)
            }
        </Box>
        </div>
    )
}


export default Profile;