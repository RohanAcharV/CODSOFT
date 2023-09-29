import React from "react";
import {AppBar, Toolbar,Avatar, Typography,Box,Menu,MenuItem,Button} from '@mui/material';
import logo from '../logo.png';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
function Nav({email,onLogout,photo,fname}){
    const [openmenu,setopenmenu]=useState(false);
    const navigate = useNavigate();

    return(
                <>
        <AppBar position="sticky">
            <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex' , alignItems:'center'}}><Avatar alt="Remy Sharp" src={logo} sx={{marginRight:'10px'}}/><Typography variant="h5" fontWeight={'bold'}>Job Buddy</Typography>
                </div>
                <div>

                    {
                      (email==='null') ?  (<Box>
                          <Box sx={{display:{xs:"none",sm:"block"}}}>
                    <Button  sx={{marginRight:'10px',color:'white',borderColor:'white',fontWeight:'bold',borderRadius:'10px'}} onClick={()=>navigate("/")}>Home</Button>
                  
                    </Box>
                    <Box sx={{display:{xs:"block",sm:"none"}}}>
                          <HomeIcon fontSize="large"  onClick={()=>navigate("/")}/>
          </Box>
                      </Box>):
                      (<Box>
            <Box display={'flex'} alignItems={'center'}><Avatar onClick={()=>setopenmenu(true)} src={photo} />
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
        <MenuItem onClick={()=>navigate("/dashboard")}> Profile </MenuItem>
        <MenuItem onClick={()=>navigate("/dashboard")}> Applications</MenuItem>
        <MenuItem onClick={()=>navigate("/")}>Home</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
          </Box>)
                    }
                </div>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Nav;