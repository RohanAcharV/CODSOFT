import React from "react";
import {Box,Container,TextField, Typography,Divider, Button, DialogContent,Dialog, DialogActions} from '@mui/material';
import { useState ,useEffect} from "react";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' 
});


function Dialogdisplay({open,onClose,onConfirm}){
    
    const handleSubmit=()=>{
        onConfirm();
        onClose();
    }

    return(
        <Dialog open={open} onClose={()=>onClose()}>
            <DialogContent>Verified and confirm to submit</DialogContent><br />
            <DialogActions>
                <Button variant="contained" onClick={handleSubmit}>Save</Button>
                <Button  onClick={()=>onClose()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
function Addjob({email}){
    // const email='varunacharv@gmail.com';
    const [details,setdetails]=useState({role:'',experience:'',location:'',salary:'',jobtype:'',aboutjob:'',openings:''})
    const [company, setcompany] = useState('');
    const [about,setabout]=useState('');

    const [open,setopen]=useState(false);
    const [responsibility,setresponsibility]=useState(['']);
    const [skills,setskills]=useState(['']);
    const [criteria,setcriteria]=useState(['']);
    const [perks,setperks]=useState(['']);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setdetails({...details,[name]: value});
      };
// ****************************
    const addinput=(array,setarray)=>{
        setarray([...array,'']);
    }
    const updateinput=(event,index,array,setarray)=>{
        const newarray=[...array];
        newarray[index]=event.target.value;
        setarray(newarray)
    }
    const removeinput=(array,setarray)=>{
        if(array.length>0){
            const newarray=[...array];
            newarray.pop();
            setarray(newarray);
        }
    }


    // **************************
    useEffect(() => {
        fetchphotoabout();
      }, []);
  
      const fetchphotoabout = async () => {
        try {
          const response = await api.post("/getphotoabout",{email});
          setabout(response.data.data.about)
          setcompany(response.data.data.company)
        } catch (error) {
          console.error('Error fetching photo/about', error);
        }
      }
    //   *******************************
    const handleSave=async()=>{

        const date = new Date(); 
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        const day = date.getDate();
        const currentDate = `${day}/${month}/${year}`;

        const jobdata={email:email,role:details.role,company:company,experience:details.experience,location:details.location,salary:details.salary,jobtype:details.jobtype,aboutjob:details.aboutjob,responsibility,skills,criteria,perks,openings:details.openings,posteddate:currentDate,applicants:0,hiringstatus:'hiring'}

        try{
            await api.post('savejob',jobdata);
            console.log("Successfully saved job")
          }
          catch{
            console.error('Error adding a new Job');
          }
    }
    return(
        <>
        <Container >
            <Box margin={'5vh 0'} sx={{textAlign:'center'}}>
                <Typography fontWeight={"bold"}>Job Role</Typography>
                <TextField placeholder="role." sx={{width:'70vw'}} name="role" onChange={handleChange}></TextField><br /><br />
                <Typography fontWeight={"bold"}>Company name</Typography>
                <TextField value={company} sx={{width:'70vw'}} readOnly></TextField>
            </Box>
            <Divider/>
            <Box margin={'5vh 0'} sx={{display:'flex',justifyContent:'space-evenly',flexWrap:'wrap','> *': {margin: '10px'}}}>
                <TextField placeholder="experience" name="experience" onChange={handleChange}></TextField>
                <TextField placeholder="location" name="location" onChange={handleChange}></TextField>
                <TextField placeholder="salary" name="salary" onChange={handleChange}></TextField>
                <TextField placeholder="jobtype" name="jobtype" onChange={handleChange}></TextField>
            </Box>
            <Divider/>
            <Box margin={'5vh 0'} sx={{textAlign:'center'}}>
            <Typography fontWeight={"bold"}>About Company</Typography><br />
            <textarea value={about} rows={5} style={{width:'80vw',color:'blue',border:'none'}} readOnly></textarea>
            </Box>
            <Divider/>
            <Box margin={'5vh 0'} sx={{textAlign:'center'}}>
            <Typography fontWeight={"bold"}>About Job</Typography><br />
            <textarea placeholder="describe job" name="aboutjob" rows={5} style={{width:'80vw'}} onChange={handleChange}></textarea>
            </Box>
            <Divider/>
            <Box margin={'5vh 0'} sx={{textAlign:'center'}}>
            <Typography fontWeight={"bold"}>Key responsibilities</Typography><br />
            {
                responsibility.map((value,index)=>(
                    <>
                    <TextField value={value} placeholder={index === 0 ? 'Key Responsibility in Job Listings' : `responsibility ${index }`} key={index} onChange={(e)=>updateinput(e,index,responsibility,setresponsibility)} sx={{width:'70vw', margin:'1vh 0'}}/><br/>
                    </>
                ))
            }
            <Button variant="contained" onClick={()=>addinput(responsibility,setresponsibility)} sx={{width:'80px',margin:'1vh 1vw',fontWeight:'bold'}}>Add</Button>
            <Button variant="outlined" color="error" onClick={()=>removeinput(responsibility,setresponsibility)} sx={{width:'80px',margin:'1vh 1vw',fontWeight:'bold'}}>Remove</Button>
            </Box>
            <Divider/>
            <Box margin={'5vh 0'} sx={{textAlign:'center'}}>
            <Typography fontWeight={"bold"}>skillsRequired</Typography><br />
            {
                skills.map((value,index)=>(
                    <>
                    <TextField value={value} placeholder={`skills ${index+1}`} key={index} onChange={(e)=>updateinput(e,index,skills,setskills)} sx={{width:'70vw', margin:'1vh 0'}}/><br/>
                    </>
                ))
            }
            <Button variant="contained" onClick={()=>addinput(skills,setskills)} sx={{width:'80px',margin:'1vh 1vw',fontWeight:'bold'}}>Add</Button>
            <Button variant="outlined" color="error" onClick={()=>removeinput(skills,setskills)} sx={{width:'80px',margin:'1vh 1vw',fontWeight:'bold'}}>Remove</Button>
            </Box>
            <Divider/>
            <Box margin={'5vh 0'} sx={{textAlign:'center'}}>
            <Typography fontWeight={"bold"}>who can apply</Typography><br />
            {
                criteria.map((value,index)=>(
                    <>
                    <TextField value={value} placeholder={`criteria ${index+1}`} key={index} onChange={(e)=>updateinput(e,index,criteria,setcriteria)} sx={{width:'70vw', margin:'1vh 0'}}/><br/>
                    </>
                ))
            }
            <Button variant="contained" onClick={()=>addinput(criteria,setcriteria)} sx={{width:'80px',margin:'1vh 1vw',fontWeight:'bold'}}>Add</Button>
            <Button variant="outlined" color="error" onClick={()=>removeinput(criteria,setcriteria)} sx={{width:'80px',margin:'1vh 1vw',fontWeight:'bold'}}>Remove</Button>
            </Box>
            <Divider/>
            <Box margin={'5vh 0'} sx={{textAlign:'center'}}>
            <Typography fontWeight={"bold"}>perks</Typography><br />
            {
                perks.map((value,index)=>(
                    <>
                    <TextField value={value} placeholder={`perks ${index+1}`} key={index} onChange={(e)=>updateinput(e,index,perks,setperks)} sx={{width:'70vw', margin:'1vh 0'}}/><br/>
                    </>
                ))
            }
            <Button variant="contained" onClick={()=>addinput(perks,setperks)} sx={{width:'80px',margin:'1vh 1vw',fontWeight:'bold'}}>Add</Button>
            <Button variant="outlined" color="error" onClick={()=>removeinput(perks,setperks)} sx={{width:'80px',margin:'1vh 1vw',fontWeight:'bold'}}>Remove</Button>
            </Box>
            <Divider/>
            <Box margin={'5vh 0'} sx={{textAlign:'center'}}>
            <Typography fontWeight={"bold"} type="number">No of openings</Typography><br />
            <TextField placeholder="enter a number" name="openings" type="number" onChange={handleChange}></TextField>
            </Box>

            <Box margin={'5vh 0'} sx={{textAlign:'center'}}>
                <Button variant="contained" sx={{width:'100px',margin:'1vh 1vw',fontWeight:'bold'}} onClick={()=>setopen(true)}>SAVE</Button>
                <Dialogdisplay open={open} onConfirm={handleSave} onClose={()=>setopen(false)}/>
            </Box>
        </Container>
        </>
    )
}

export default Addjob;