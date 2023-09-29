
import Nav from "./Nav";
import Profile from "./Profile";
import Appdet from "./Appdet";

import { useState ,useEffect} from "react";
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000/api' 
});


function DashBoard({email,onLogout}){
    const [navdata,setnavdata]=useState({})

    useEffect(()=>{
        fetchnavdata();
      },[])

    const fetchnavdata=async()=>{
        try{
            const response=await api.post("getnameid",{email});
            setnavdata(response.data.userdata)
          }
          catch(error){
            console.error('Error fetching navdata', error);
          }
    }

    return(
        <>
       {
        (navdata.id) && (
            <div>
        <Nav email={email} onLogout={onLogout} fname={navdata.fname} photo={navdata.photo}/>
        <Profile email={email} fname={navdata.fname}/>
        <Appdet userid={navdata.id}/>
            </div>
        )
       }
        </>
    )
}

export default DashBoard;