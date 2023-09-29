import React from "react";
import {AppBar, Toolbar,Avatar, Typography,Menu,MenuItem,Box} from '@mui/material';
import logo from '../logo.png';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function scrollToDiv(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

function Nav({email,onLogout,fname,photo}){
  const navigate = useNavigate();
    const [openmenu,setopenmenu]=useState(false);
    return(
        <>
        <AppBar position="sticky">
            <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex' , alignItems:'center'}}><Avatar alt="Remy Sharp" src={logo} sx={{marginRight:'10px'}}/><Typography variant="h5" fontWeight={'bold'}>Job Buddy</Typography>
                </div>
                <Box display={'flex'} alignItems={'center'}><Avatar src={photo} onClick={()=>setopenmenu(true)} />
                        <Typography sx={{marginLeft:'2vw' , display:{xs:"none",sm:"block"}}}>Hello {fname}</Typography></Box>
                <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openmenu}
        onClose={()=>setopenmenu(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=>scrollToDiv('applicant_profile')}> Profile </MenuItem>
        <MenuItem onClick={()=>scrollToDiv('applicant_applications')}>Applications</MenuItem>
        <MenuItem onClick={()=>navigate("/")}>Home</MenuItem>
        <MenuItem onClick={()=>navigate("/jobs")}>Jobs</MenuItem>
        <MenuItem onClick={()=>{onLogout();navigate("/");}}>Logout</MenuItem>
      </Menu>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Nav;