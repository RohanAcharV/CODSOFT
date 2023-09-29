import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper ,Typography,Button,Box} from '@mui/material';
import { styled } from '@mui/system';
import { useState ,useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

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

function JobApplicants(){
      const {jobid} =useParams();
    
      const [applicants,setapplicants]=useState([]);
      const [applicantdet,setapplicantdet]=useState([]);
      const [jobstatus,setjobstatus]=useState('hiring');
  
      function OpenResume(pdf){
        if(pdf===null)
        {
            return;
        }
        window.open(pdf, '_blank');
    }

    const updateapplicationstatus=async(userid,status)=>{
      try{
        const response=await api.post("updateapplicationstatus",{jobid,userid,status});
        fetchapplicants();
      }
      catch(error){
        console.error('Error in updating status', error);
      }
    }

      useEffect(()=>{
        fetchapplicants();
      },[])

      const fetchapplicants=async()=>{
        try{
          const response=await api.post("getapplications_employer",{jobid});
          setapplicants(response.data.applications)
        }
        catch(error){
          console.error('Error fetching applications', error);
        }
      }

      useEffect(()=>{
        fetchapplicantdet();
      },[applicants])

      const fetchapplicantdet=async()=>{
        try{

          const userids = applicants.map((applicant) => applicant.userid);
          const response=await api.post("fetchuserdetails",{userids});
          setapplicantdet(response.data.userdetails)
          
        }
        catch(error){
          console.error('Error fetching applications details', error);
        }
      }

    
      useEffect(()=>{
        checkstatus();
      },[jobstatus,setjobstatus])

      const checkstatus=async()=>{
        try{
            const response=await api.post("updatehiring",{jobid,status:null});
            setjobstatus(response.data.jobstatus)
        } catch (error) {
            console.error('Error fetching applicationstatus', error);
          }
      }

      const updatehiring=async()=>{
        try{
            await api.post("updatehiring",{jobid,status:'stopped'});
            await api.post("rejectapplications",{jobid})
            setjobstatus('stopped')
            fetchapplicants();
            fetchapplicantdet();

        } catch (error) {
            console.error('Error fetching applicationstatus', error);
          }
      }
     
    return(
        <div>
            <Typography sx={{textAlign:'center',margin:'5vh 0', fontWeight:'bolder',fontSize:{xs:'18px',sm:'24px',md:'30px'}}}>Job Name</Typography>
            
            <TableContainer component={Paper} sx={{paddingBottom:'10vh'}}>
        <Table>
          <TableHead >
            <TableRow sx={{backgroundColor:'aliceblue'}} >
              <TableHeadData >Applicant name</TableHeadData>
              <TableHeadData >Applicant email</TableHeadData>
              <TableHeadData >Resume link</TableHeadData>
              <TableHeadData > </TableHeadData>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.length>0 && applicantdet.length>0 ? (
                            applicants.map((a, index) => (
                                <TableRow key={index}>
                                  <TableData>{applicantdet[index].fname} {applicantdet[index].lname}</TableData>
                                  <TableData>{applicantdet[index].email}</TableData>
                                  <TableData>
                                  {
                                    applicantdet[index].resume!=null?
                                    (<Button sx={{fontWeight:'bold',color:'blue'}} onClick={()=>OpenResume(applicantdet[index].resume)}>View resume</Button>):
                                    (<Button sx={{fontWeight:'bold',color:'red'}}>No resume</Button>)
                                  }
                                  </TableData>
                                  <TableData >
                                  {
                                      (a.status==='selected')&&(
                                          <Button sx={{fontWeight:'bold',color:'green'}}>Selected</Button>
                                      )
                                      ||
                                      (a.status==='rejected')&&(
                                          <Button sx={{fontWeight:'bold',color:'red'}}>Rejected</Button>
                                      )
                                      ||
                                      (a.status==='pending')&&(
                                          <>
                                          <Button variant="contained" color="secondary" sx={{margin:'0 1vw',width:'80px'}}onClick={()=>updateapplicationstatus(a.userid,"waiting")}>Wait</Button>
                                          <Button variant="outlined" color="error" sx={{margin:'0 1vw',width:'80px'}}onClick={()=>updateapplicationstatus(a.userid,"rejected")}>Reject</Button>
                                          </>
                                      )||
                                      (a.status==='waiting')&&(
                                          <>
                                          <Button variant="contained" sx={{margin:'0 1vw',width:'80px'}} onClick={()=>updateapplicationstatus(a.userid,"selected")}>Select</Button>
                                          <Button variant="outlined" color="error" sx={{margin:'0 1vw',width:'80px'}}onClick={()=>updateapplicationstatus(a.userid,"rejected")}>Reject</Button>
                                          </>
                                      )
                                  }
                                  </TableData>
                                </TableRow>
                              ))
            ): (
                <Typography textAlign={'center'}>No applicants</Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {
        (jobstatus!=='stopped' && applicants.length!=0)&&(
            <Button color="error" variant="contained" sx={{ position: 'sticky', bottom: '5vh', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} onClick={()=>updatehiring()}>Stop hiring</Button>
        )

      }
        </div>
    )
}

export default JobApplicants;