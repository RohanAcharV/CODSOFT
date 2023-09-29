import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Radio,FormLabel,FormControl,RadioGroup} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import {Dialog,DialogContent,DialogActions} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' 
});


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Job Buddy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function ErrorDialog({open,onClose}){
  return(
      <Dialog open={open} onClose={()=>onClose()}>
      <DialogContent sx={{display:'flex',alignItems:'center'}}> <WarningIcon color="error"/> &nbsp;User already exists</DialogContent>
      <DialogActions>
        <Button onClick={()=>onClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

const defaultTheme = createTheme();

export default function SignUp({setuseremail,setemployeremail}) {
  const navigate = useNavigate();

  const [open,setopen]=useState(false);
  const [data,setdata]=useState({fname:'',lname:'',email:'',password:''});
  const [type,settype]=useState('Applicant');
  const [company,setcompany]=useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setdata({...data,[name]: value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(type=='Applicant'){
      const userdata={fname:data.fname,lname:data.lname,email:data.email,password:data.password,photo:null,resume:null}

      try{
        const response=await api.post('saveuser',userdata);
        const {success,message}=response.data;
        if (success) {
          console.log(message);
          setuseremail(data.email)
          navigate("/dashboard")
        } else {
          console.log(message);
          setopen(true);
        }
      }
      catch{
        console.error('Error adding a new User');
      }
    }
    else{
      const employerdata={fname:data.fname,lname:data.lname,email:data.email,password:data.password,company:company}

      try{
        const response=await api.post('saveemployer',employerdata);
        const {success,message}=response.data;
        if (success) {
          console.log(message);
          setemployeremail(data.email)
          navigate("/employerdashboard")
        } else {
          console.log(message);
          setopen(true);
        }
      }
      catch{
        console.error('Error adding a new User');
      }
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lname"
                  onChange={handleChange}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  
                />
              </Grid>

              <Grid sx={{margin:'3vh auto'}} >
              <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Sign Up as</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={type}
        onChange={(e)=>settype(e.target.value)}
      >
        <FormControlLabel value="Applicant" control={<Radio />} label="Applicant" />
        <FormControlLabel value="Employer" control={<Radio />} label="Employer" />
      </RadioGroup>
    </FormControl>
              </Grid>
              {
                (type=='Employer')&&(
                  <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="company"
                    label="Company Name"
                    id="company"
                    onChange={(e)=>setcompany(e.target.value)}
                  />
                </Grid>
                )
              }
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ErrorDialog open={open} onClose={()=>setopen(false)}/>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}