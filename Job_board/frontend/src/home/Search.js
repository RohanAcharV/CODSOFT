import React, { useState } from "react";
import { Container,Box ,InputBase,Button,Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
function Search(){
    const navigate = useNavigate();
    const [searchkey,setsearchkey]=useState('');
    const handlejobsearch=()=>{
        navigate(`/jobs/${searchkey}`)
    }
    return(
        <>
        <Container sx={{backgroundColor:'rgba(173, 216, 230, 0.2);', minHeight:'65vh',textAlign:'center'}} maxWidth='100vw'>
        <Box sx={{display:'flex',flexDirection:'column',paddingTop:'15vh'}}>
         <Typography sx={{fontSize:{xs:'1.5rem',sm:'2rem'},fontWeight:'bold'}}>Your Career Companion: Find Your Perfect Job Match</Typography>

         <Box sx={{display:'flex',alignItems:'center',paddingTop:'10vh',margin:'auto'}}>
            <InputBase placeholder="search jobs ..." sx={{backgroundColor:'white',fontSize:'18px',borderRadius:'10px',width:'50vw',marginRight:'10px',padding:'9px',border:'1px solid lightblue'}} onChange={(e)=>setsearchkey(e.target.value)}></InputBase>
            <Button variant="contained" color="primary" sx={{display:{xs:"none",sm:"block"},padding:'15px',fontWeight:'bold',borderRadius:'15px'}} onClick={handlejobsearch}>Search</Button>
            <SearchIcon sx={{display:{xs:"block",sm:"none"},padding:'14px',backgroundColor:'rgba(15, 70, 197, 0.9)',borderRadius:'15px',color:'white',border:'1px solid white'}} onClick={handlejobsearch}></SearchIcon>
        </Box>   
        </Box>   
        </Container>
        </>
    )
}

export default Search;