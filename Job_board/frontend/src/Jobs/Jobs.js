import React from "react";
import Nav from "./Nav";
import Joblist from "./Joblist";
import { useState ,useEffect} from "react";
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000/api' 
});

function Jobs({email,onLogout}){

    const [fname,setfname]=useState('');
    const [photo,setphoto]=useState('');

    useEffect(()=>{
        fetchnavdata();
      },[])

    const fetchnavdata=async()=>{
        try{
            const response=await api.post("getnameid",{email});
            setfname(response.data.userdata.fname)
            setphoto(response.data.userdata.photo)
          }
          catch(error){
            console.error('Error fetching navdata', error);
          }
    }
    return(
    <>
    
        <Nav email={email} onLogout={onLogout} fname={fname} photo={photo}/>
        <Joblist/>
    </>
        
    )
}

export default Jobs;