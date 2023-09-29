import React from "react";
import { Container ,Typography,Box,Card, Button, Divider} from "@mui/material";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Place as Loc,CurrencyRupee as Money,CalendarMonth as Calendar ,ArrowForwardIos as Arrow}from '@mui/icons-material';
  
// import jobData from "./Jobs";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from "react";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' 
});

function Featured(){
  const navigate = useNavigate();
    const [jobs,setjobs]=useState([]);

    useEffect(() => {
        fetchjobs();
      }, []);
  
      const fetchjobs = async () => {
        try {
          const reqdata={email:null,search:null,number:null,id:null,key:'featuredjobs'}
          const response = await api.post("/fetchjobs",reqdata);
          setjobs(response.data.jobsdata)
          console.log(response.data.jobsdata)
          
        } catch (error) {
          console.error('Error fetching jobs', error);
        }
      }

    return(
        <>
        <Container sx={{backgroundColor:'rgba(173, 216, 230, 0.5);',minHeight:'50vh',padding:'5vh 0',textAlign:'center'}} maxWidth='100vw'>
        <Typography fontSize={'30px'} fontWeight={'bolder'} sx={{textAlign:'center'}}>Featured Jobs</Typography>

        <Box sx={{paddingTop:'5vh',width:'100%', margin:'0'}} maxWidth='100vw'>
        
        

        <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
        // spaceBetween={30}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      centeredSlides={true}
    
      breakpoints={{
        300:{
            slidesPerView:1
            ,navigation:{
                enabled:false
            }
            
        },
        450:{
            slidesPerView:1,
            navigation:{
                enabled:true
            }
        },
        700:{
            slidesPerView:2

        },
        1100:{
            slidesPerView:3
            ,navigation:{
                enabled:true
            }
        }
      }}
    >
        {
            jobs.map((j,index)=>(
                <SwiperSlide>
                    <Card sx={{maxWidth:'280px',minHeight:'300px',backgroundColor:'rgba(255, 255, 255, 0.75);',margin:'1vh auto',borderRadius:'10px',padding:'1vh 2vw'}} key={index}>
                    <Box sx={{height:'100px'}}>
                    <Typography fontSize={'23px'} fontWeight={'bold'}>{j.role}</Typography>
                    <Typography fontSize={'20px'}>{j.company}</Typography>
                    </Box>
                    <Divider sx={{backgroundColor: 'gray',margin:'1vh 0 5vh 0'}}/>
                    <Typography fontSize={'18px'} sx={{display:'flex',alignItems:'center'}} mt={'1vh'}><Loc/>&nbsp;{j.location}</Typography>
                    <Typography fontSize={'18px'} sx={{display:'flex',alignItems:'center'}} mt={'1vh'}><Calendar/>&nbsp;{j.jobtype}</Typography>
                    <Typography fontSize={'18px'} sx={{display:'flex',alignItems:'center'}} mt={'1vh'}><Money/>&nbsp;{j.salary}</Typography>
                    <br />
                    <Button sx={{fontWeight:'bolder'}} onClick={()=>navigate(`/jobdesc/${j._id}`)}>View details <Arrow fontSize='small'/></Button>
                    </Card>
                </SwiperSlide>
            ))
        }
<br /><br /><br />
    </Swiper>    
        </Box>
        <Button variant="contained" sx={{textAlign:'center',margin:'1vh 0',fontWeight:'bold'}}onClick={()=>navigate(`/jobs`)}>View more Jobs</Button>
        </Container>
        </>
    )
}

export default Featured;