import React from "react";
import {Box,Container,Typography,ListItem,List,Divider} from '@mui/material';
import styled from "@emotion/styled";
import {Instagram,YouTube,Twitter,LinkedIn} from '@mui/icons-material'
const StyledList = styled(ListItem)({
    fontSize:'18px'
})

function Footer(){
    return(
        <footer>
            <Container sx={{paddingTop:'10vh', color:'white',backgroundColor:'rgba(0, 0, 0, 0.85);'}} maxWidth={'100vw'}>
            <Container sx={{display:'flex', justifyContent:'space-between', flexDirection:{xs:'column',md:'row'}}}>
            <Box sx={{textAlign:'center'}}>
                <Box display={'flex'} alignItems={'center'} ><Typography>Connect with us</Typography> &nbsp;&nbsp; <Instagram/>  &nbsp;<Twitter/> &nbsp; <YouTube/>  &nbsp;<LinkedIn/> </Box>
            </Box>
            <Container sx={{display:'flex', justifyContent:'space-evenly', flexDirection:{xs:'column',sm:'row'}}}>
            <Box>
                <List>
                    <StyledList sx={{fontWeight:'bold'}}>About us</StyledList>
                    <StyledList >Our Services</StyledList>
                    <StyledList>Contact us</StyledList>
                    <StyledList>Help</StyledList>
                </List>
            </Box>
            <Box>
            <List>
                    <StyledList sx={{fontWeight:'bold'}}>Jobs</StyledList>
                    <StyledList>Internships</StyledList>
                    <StyledList>Full time </StyledList>
                    <StyledList>Work from Home </StyledList>
                </List>

            </Box>
            <Box>
            <List>
                    <StyledList sx={{fontWeight:'bold'}}>Privacy</StyledList>
                    <StyledList>Terms and Conditions</StyledList>
            </List>

            </Box>
            </Container>
            </Container>
            <Divider sx={{backgroundColor:'white',margin:'2vh 0'}}/>
            <Box sx={{textAlign:'center' ,marginTop:'1vh' }}> Copyright © Job Buddy {new Date().getFullYear()}.</Box>
            </Container>
        </footer>
    )
}

export default Footer;