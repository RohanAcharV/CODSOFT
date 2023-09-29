import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper ,Typography ,Link} from '@mui/material';
import { styled } from '@mui/system';


import { useState ,useEffect} from "react";
import axios from 'axios';


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


function Appdet({userid}) {

  // const userid='650aa70629fb17cd307363f2';
  const [applications,setapplications]=useState([]);
  const [jobdet,setjobdet]=useState([]);

  useEffect(()=>{ 
    fetchapplications();
  },[])

  const fetchapplications=async()=>{
    try{
      const response=await api.post("getapplications_user",{userid});
      setapplications(response.data.applications)
      console.log("Applications : ",response.data.applications)
    }
    catch(error){
      console.error('Error fetching applications', error);
    }
  }

  useEffect(()=>{
    fetchjobdet();
  },[applications])

  const fetchjobdet=async()=>{
    try{

      const jobids = applications.map((application) => application.jobid);
      const response=await api.post("fetchjobdetails",{jobids});
      setjobdet(response.data.jobdetails)
      console.log("Job details : ",response.data.jobdetails)
      
    }
    catch(error){
      console.error('Error fetching applications details', error);
    }
  }
  return (
    <div style={{ overflowX: 'auto' , padding:'10vh 0' }} id="applicant_applications">
        <Typography sx={{textAlign:'center',margin:'5vh 0', fontWeight:'bolder',fontSize:{xs:'18px',sm:'24px',md:'30px'}}}>My Applications</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead >
            <TableRow sx={{backgroundColor:'aliceblue'}} >
              <TableHeadData >Company Name</TableHeadData>
              <TableHeadData >Job Role</TableHeadData>
              <TableHeadData >No. of Applicants</TableHeadData>
              <TableHeadData >Applied On</TableHeadData>
              <TableHeadData >Application Status</TableHeadData>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            (applications.length>0) && (jobdet.length>0) && 
            (applications.map((application, index) => (
              <TableRow key={index}>
                <TableData>{jobdet[index].company}</TableData>
                <TableData><Link href={`/jobdesc/${application.jobid}`}>{jobdet[index].role}</Link></TableData>
                <TableData>{jobdet[index].applicants}</TableData>
                <TableData>{application.applieddate}</TableData>
                <TableData sx={{color:application.status==='selected'?'green':'blue',fontWeight:application.status==='selected'?'bold':'none'}}>{application.status}</TableData>
              </TableRow>
            )))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Appdet;
