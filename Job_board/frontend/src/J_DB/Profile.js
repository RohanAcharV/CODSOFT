import React from "react";
import { Avatar , Box,  Typography ,Button } from "@mui/material";
import { useState ,useEffect} from "react";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' 
});


function Profile({email,setfetchphoto}){
    // const email='varunacharv@gmail.com';
    useEffect(() => {
        fetchphotoabout();
      }, []);
  
      const fetchphotoabout = async () => {
        try {
          const response = await api.post("/getphotoabout",{email});
          
          setImage(response.data.data.photo)
          setabout(response.data.data.about)
          setcompany(response.data.data.company)


        } catch (error) {
          console.error('Error fetching photo/about', error);
        }
      }

    const [edit,setedit]=useState(false);
    const [company, setcompany] = useState('');
    const [about,setabout]=useState('About Company ..')
    const [image, setImage] = useState(null);

  

    const handleEdit=async(e)=>{
        
        const updatedata={email,photo:image,about:about}
      
        try{
          await api.post('updatephotoabout',updatedata);
          fetchphotoabout();
          setfetchphoto(true);
        }
        catch{
          console.log('Error in updating Photo/About')
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
        <Box sx={{backgroundColor:'aliceblue', padding:'10vh 0',minHeight:'65vh'}}>
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
                edit ?(<></>):( <><Typography textAlign={'center'} marginTop={'2vh'}sx={{fontSize:{xs:'18px',sm:'25px'},fontWeight:'bold'}}>{company}</Typography>
                <Typography textAlign={'center'} marginTop={'1vh'}sx={{fontSize:{xs:'14px',sm:'18px'},color:'blue'}}>{email}</Typography></>)
               }
                <Box sx={{display:'flex', flexDirection:'column',alignItems:'center',textAlign:'center',margin:'auto'}}>
                <Box padding={'0 2vw'}>
                {edit?(
                <div>
                       <Box sx={{marginTop:'5vh'}}>
               <textarea value={about} style={{width:'80vw',height:'20vh',color:'blue'}} onChange={(e)=>setabout(e.target.value)}/>

                </Box>
                </div>
                ):( 
                
<Typography textAlign={'center'} marginTop={'2vh'}sx={{fontSize:{xs:'14px',sm:'18px'}}}>{about}</Typography>
                )}
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