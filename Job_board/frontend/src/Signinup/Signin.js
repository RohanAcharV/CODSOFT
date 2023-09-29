import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Radio,FormLabel,FormControl,RadioGroup,FormControlLabel} from '@mui/material';
import {Dialog,DialogContent,DialogActions} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate ,useParams} from 'react-router-dom';

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

  function ErrorDialog({open,onClose,errormessage}){
    return(
        <Dialog open={open} onClose={()=>onClose()}>
        <DialogContent sx={{display:'flex',alignItems:'center'}}> <WarningIcon color="error"/> &nbsp;{errormessage}</DialogContent>
        <DialogActions>
          <Button onClick={()=>onClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

const defaultTheme = createTheme();

export default function SignIn({setuseremail,setemployeremail}) {
  const navigate = useNavigate();
  const {location,jobid}=useParams();
  const [open,setopen]=useState(false);
  const [data,setdata]=useState({email:'',password:''});
  const [type,settype]=useState('Applicant');
  const [errormessage,seterrormessage]=useState('');
  const handleChange = (event) => {
    const { name, value } = event.target;
    setdata({...data,[name]: value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(type=='Applicant'){
      const userdata={email:data.email,password:data.password}

      try{
        const response=await api.post('checkuser',userdata);
        const {success,message}=response.data;
        if (success) {
          console.log(message);
          setuseremail(data.email)
          if(location=='jobdesc'){
            navigate(`/jobdesc/${jobid}`)
          }
          else
          navigate("/")

        } else {
          console.log(message);
          seterrormessage(message);
          setopen(true);
        }
      }
      catch{
        console.error('Error adding a new User');
      }
    }
    else{
      const employerdata={email:data.email,password:data.password}

      try{
        const response=await api.post('checkemployer',employerdata);
        const {success,message}=response.data;
        if (success) {
          console.log(message);
          setemployeremail(data.email)
          navigate("/employerdashboard")
        } else {
          console.log(message);
          seterrormessage(message);
          setopen(true);
        }
      }
      catch{
        console.error('Error adding a new Employer');
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
           <Grid sx={{margin:'1vh auto'}} >
              <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Sign In as</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={type}
        onChange={(e)=>settype(e.target.value)}
      >
        <FormControlLabel value="Applicant" control={<Radio />} label="Applicant" />
        <FormControlLabel value="Job Poster" control={<Radio />} label="Employer" />
      </RadioGroup>
    </FormControl>
              </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ErrorDialog open={open} onClose={()=>setopen(false)} errormessage={errormessage}/>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}