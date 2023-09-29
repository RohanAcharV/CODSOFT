import { Button } from "@mui/material";
import { Container,Box ,Card,Typography,CardContent,Stack,Pagination,Divider,InputBase} from "@mui/material";
import React, { useState,useEffect } from "react";

import { Place as Loc,CurrencyRupee as Money,CalendarMonth as Calendar ,ArrowForwardIos as Arrow,WorkHistory}from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useParams ,useNavigate} from "react-router-dom";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' 
});

function Joblist(){
  let { searchkey } = useParams();
  const navigate = useNavigate();

    const [page,setpage]=useState(1);
    const [pagecount,setpagecount]=useState(10);
    const [search,setsearchkey]=useState(searchkey || '');
    const [jobs,setjobs]=useState([]);

    console.log(searchkey)

  //   useEffect(()=>{
  //     if(searchkey!==undefined)
  //     { console.log("Key is defined :", searchkey)
  //      setsearchkey(searchkey);
  //    fetchjobs();
  //  }
  //   },[searchkey])

  //     useEffect(()=>{
  //       console.log("Key was undefined")
  //       fetchjobs();
  //     },[searchkey,search,setsearchkey])
  
  useEffect(() => { 
    fetchjobs();
  }, [searchkey, page ,search ]);

      const fetchjobs = async () => {
        try {
          
            //here number is page number
        console.log(search)
          const reqdata={email:null,search:search,number:page,id:null,key:'searchjobs'}
          const response = await api.post("/fetchjobs",reqdata);
          setjobs(response.data.jobsdata)
          setpagecount(response.data.numberofpages)
        console.log(jobs.length)
          
        } catch (error) {
          console.error('Error fetching photo/about', error);
        }
      }

    return(
        <>
        <Container sx={{ backgroundColor:'rgba(173, 216, 230, 0.2);',minHeight:'100vh',padding:{xs:'5vh 20px',sm:'5vh 30px'}}} maxWidth='100vw'>
        
        <Box sx={{display:'flex',alignItems:'center',paddingTop:'5vh',width:'80vw',margin:'auto',justifyContent:'center'}}>
            <InputBase placeholder="search jobs ..." sx={{backgroundColor:'white',fontSize:'18px',borderRadius:'10px',width:'50vw',marginRight:'10px',padding:'9px',border:'1px solid lightblue'}} onChange={(e)=>setsearchkey(e.target.value)} ></InputBase>
            <Button variant="contained" color="primary" sx={{display:{xs:"none",sm:"block"},padding:'15px',fontWeight:'bold',borderRadius:'15px'}} onClick={()=>fetchjobs()}>Search</Button>
            <SearchIcon sx={{display:{xs:"block",sm:"none"},padding:'14px',backgroundColor:'rgba(15, 70, 197, 0.9)',borderRadius:'15px',color:'white',border:'1px solid white'}}></SearchIcon>
        </Box>   

        {
            jobs.map((job,cardindex)=>(
                <Card sx={{ maxWidth: {xs:'500px',sm:'750px',md:'1100px'} , minHeight:{xs:'285px',sm:'300px'}, margin:'5vh auto' ,borderRadius:{xs:'10px',sm:'25px'}}} key={cardindex}>
     
                <CardContent>
                
                <Box>
                <Typography sx={{fontSize:{xs:'17px',sm:'25px'}}} fontWeight={'bold'}>{job.role}</Typography>
                <Typography sx={{fontSize:{xs:'15px',sm:'20px'}}}>{job.company}</Typography>
                </Box>
                <Divider sx={{margin:'2vh 0'}}></Divider>
                <Box sx={{display:'flex' , flexDirection:{xs:'column',sm:'row'},justifyContent:'flex-start'}}>
                
                <Stack
                direction={{ xs: 'column', sm: 'row' }}
                divider={<Divider orientation="vertical" flexItem />}
                spacing={{xs:0 , sm:2 , md: 4}} 
                >
                
                <Typography sx={{fontSize: { xs: '14px', sm: '16px' },alignItems:'center'}}><WorkHistory fontSize="small"/>&nbsp;{job.experience}</Typography>
                <Typography sx={{fontSize: { xs: '14px', sm: '16px' }}}><Loc fontSize="small"/>&nbsp;{job.location}</Typography>
                <Typography sx={{fontSize: { xs: '14px', sm: '16px' }}}><Money fontSize="small"/>&nbsp;{job.salary}</Typography>
                <Typography sx={{fontSize: { xs: '14px', sm: '16px' }}}><Calendar fontSize="small"/>&nbsp;{job.jobtype}</Typography>

                </Stack>
                </Box>
                <Box sx={{display:{xs:'none',sm:'block'}}}>
                <Typography sx={{margin:'1vh 0'}}>{job.responsibility[0]}</Typography>
                <ul style={{display:'flex',fontSize:'14px'}}>{job.skills.map((s,index)=>(
                    <li style={{margin:'0 2vw'}} key={index}>{s}</li>
                ))}</ul>
                </Box>
                
                <Typography sx={{fontSize: { xs: '14px', sm: '18px' } , color:'green'}}>{job.posteddate}</Typography>

                <Button variant="outlined" sx={{textAlign:'center',margin:'3vh 0 1vh 0',fontWeight:'bold'}} onClick={()=>navigate(`/jobdesc/${job._id}`)}>View details</Button>
                </CardContent>
              </Card> 
            ))
        }
        {
          (jobs.length>0) && (    <Box sx={{ width:'80vw', margin:'auto', height:'5vh',textAlign:'center',display:'flex'}}>
       
          <Pagination count={pagecount} color="primary" sx={{margin:'auto', display:{xs:'none',sm:'block'}}} page={page} onChange={(event,value)=>{ setpage(value);}} />
               </Box>
  )
        }
        </Container>
       
        </>
    )
}

export default Joblist;