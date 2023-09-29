import React from "react";
import {AppBar, Toolbar,Avatar, Typography,Box,List,ListItem,Menu,MenuItem} from '@mui/material';
import logo from '../logo.png';
import { useState , useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function Nav({email,fname,onLogout,photo}){
  const navigate = useNavigate();
    const [openmenu,setopenmenu]=useState(false);
    const [openlogout,setopenlogout]=useState(false);
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 600) {
          setopenmenu(true);
        } else {
          setopenmenu(false);
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return(
        <>
        <AppBar position="sticky">
            <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex' , alignItems:'center'}}><Avatar alt="Remy Sharp" src={logo} sx={{marginRight:'10px'}}/><Typography variant="h5" fontWeight={'bold'}>Job Buddy</Typography>
                </div>
                <Box display={'flex'} alignItems={'center'}><Avatar  onClick={()=>setopenlogout(true)}src={photo} />
                        <Typography sx={{marginLeft:'2vw' , display:{xs:"none",sm:"block"}}}>Hello {fname}</Typography></Box>
                        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openlogout}
        onClose={()=>setopenlogout(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=>{onLogout();navigate("/");}}>Logout</MenuItem>
      </Menu>

            </Toolbar>
        <Toolbar sx={{backgroundColor:'white',color:'black'}}>
        <List sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap',flexDirection:{xs:'column',sm:'row'} , fontSize:'18px',cursor:'pointer'}} onClose={()=>setopenmenu(false)}>
      <ListItem sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MenuIcon fontSize="large" onClick={()=>setopenmenu(!openmenu)} />
      </ListItem>
      
      
      {( openmenu) && (
        <>
          <ListItem onClick={()=>{navigate("/employerdashboard")}}>  Profile</ListItem>
          <ListItem onClick={()=>{navigate("/employerdashboard/addjob")}}> Add Job</ListItem>
          <ListItem onClick={()=>{navigate("/employerdashboard/alljobs")}}> Posted Jobs</ListItem>
        </>
      )}

    </List>
        </Toolbar>
        </AppBar>

        </>
    )
}

export default Nav;