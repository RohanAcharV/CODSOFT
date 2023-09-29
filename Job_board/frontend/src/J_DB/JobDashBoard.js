import React from "react";
import Nav from "./Nav";
import Profile from "./Profile";
import Addjob from "./Addjob";
import AllJobs from "./AllJobs";
import JobApplicants from "./JobApplicants";
import EmpJobdesc from "../Jobdesc/EmpJobdesc";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useState ,useEffect} from "react";
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000/api' 
});

function JobDashBoard({email,onLogout}){
    const [navdata,setnavdata]=useState({})
    const [fetchphoto,setfetchphoto]=useState(false);

    useEffect(()=>{
        fetchnavdata();
      },[])

      useEffect(()=>{
        fetchnavdata();
      },[setfetchphoto])

    const fetchnavdata=async()=>{
        try{
            const response=await api.post("getemployernameid",{email});
            setnavdata(response.data.employerdata)
            // console.log(response.data.employerdata)
          }
          catch(error){
            console.error('Error fetching navdata', error);
          }
    }
    return(
       (navdata.id) && (
        <>
        
        <Nav email={email} onLogout={onLogout} fname={navdata.fname} photo={navdata.photo}/>

            <Routes>
                <Route path="/" element={<Profile email={email} setfetchphoto={setfetchphoto}/>}></Route>
                <Route path="/addjob" element={<Addjob email={email}/>}></Route>
                <Route path="/alljobs" element={<AllJobs email={email}/>}></Route>
                <Route path="/jobapplicants/:jobid" element={<JobApplicants />}></Route>
                <Route path="/jobdesc/:jobid" element={<EmpJobdesc />}></Route>
            </Routes>
        
        
        </>
       )
    )

}

export default JobDashBoard;