import React from "react";

import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper ,Typography,Button ,Link} from '@mui/material';
import { styled } from '@mui/system';
import { useState ,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:5000/api' 
});

const TableData = styled(TableCell)({
    whiteSpace: 'nowrap',
    textAlign:'center',
  });
  
  const TableHeadData = styled(TableData)({
      whiteSpace: 'nowrap',
      textAlign:'center',
   color:'blue',fontWeight:'bolder',fontSize:'16px'
    });

function AllJobs({email}){
    const [jobs,setjobs]=useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchjobs();
      }, []);
  
      const fetchjobs = async () => {
        try {
          const reqdata={email:email,search:'',number:0,id:null,key:'employerjobs'}
          const response = await api.post("/fetchjobs",reqdata);
          setjobs(response.data.jobsdata)
          
        } catch (error) {
          console.error('Error fetching photo/about', error);
        }
      }

    return(
       <div>
        <Typography sx={{textAlign:'center',margin:'5vh 0', fontWeight:'bolder',fontSize:{xs:'18px',sm:'24px',md:'30px'}}}>Posted Jobs</Typography>
        <TableContainer component={Paper} sx={{marginBottom:'5vh'}}>
        <Table>
          <TableHead >
            <TableRow sx={{backgroundColor:'aliceblue'}} >
              <TableHeadData >Job Role </TableHeadData>
              <TableHeadData >No. of Applicants</TableHeadData>
              <TableHeadData >Posted On</TableHeadData>
              <TableHeadData ></TableHeadData>
            </TableRow>
          </TableHead>
          <TableBody>
            {

                jobs.length>0 ? (
                    jobs.map((job, index) => (
                        <TableRow key={index}>
                          <TableData><Link href={`/employerdashboard/jobdesc/${job._id}`}>{job.role}</Link></TableData>
                          <TableData>{job.applicants}</TableData>
                          <TableData>{job.posteddate}</TableData>
                          <TableData ><Button variant="outlined" onClick={()=>navigate(`/employerdashboard/jobapplicants/${job._id}`)}>View Applicants</Button></TableData>
                        </TableRow>
                      ))
                ) : (
                    <Typography textAlign={'center'}>No jobs posted</Typography>
                )
            }
          </TableBody>
        </Table>
      </TableContainer>
       </div>
    )
}

export default AllJobs;