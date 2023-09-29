import React from "react";
import {AppBar, Toolbar,Avatar, Typography,Box,Button} from '@mui/material';
import logo from '../logo.png';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
function Nav(){
  const navigate = useNavigate();
    return(
        <>
        <AppBar position="sticky">
            <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex' , alignItems:'center'}}><Avatar alt="Remy Sharp" src={logo} sx={{marginRight:'10px'}}/><Typography variant="h5" fontWeight={'bold'}>Job Buddy</Typography>
                </div>

                <div>
                <Box>
                          <Box sx={{display:{xs:"none",sm:"block"}}}>
                    <Button  sx={{marginRight:'10px',color:'white',borderColor:'white',fontWeight:'bold',borderRadius:'10px'}} onClick={()=>navigate("/")}>Home</Button>
                  
                    </Box>
                    <Box sx={{display:{xs:"block",sm:"none"}}}>
                          <HomeIcon fontSize="large"  onClick={()=>navigate("/")}/>
                  </Box>
                      </Box>
                   
                </div>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Nav;