import React, { useEffect, useState } from "react";
import { Container, Box, Divider, Typography, Stack, Button ,Avatar} from "@mui/material";
import { Place as Loc, CurrencyRupee as Money, CalendarMonth as Calendar, WorkHistory, People } from "@mui/icons-material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

function EmpJobdesc() {
  const { jobid } = useParams();

  const [jobs, setjobs] = useState({});
  const [empemail, setempemail] = useState("");
  const [about, setabout] = useState("");
  const [photo,setphoto]=useState(null)

  useEffect(() => {
    fetchjobs();
  }, [jobid]);

  const fetchjobs = async () => {
    try {
      const reqdata = { empemail: null, search: null, number: null, id: jobid, key: null };
      const response = await api.post("/fetchjobs", reqdata);
      setjobs(response.data.jobsdata[0]);
      setempemail(response.data.jobsdata[0].email);
    } catch (error) {
      console.error("Error fetching job details", error);
    }
  };

  useEffect(() => {
    if (empemail !== "") fetchphotoabout();
  }, [empemail]);

  const fetchphotoabout = async () => {
    try {
      const response = await api.post("/getphotoabout", { email: empemail });
      setabout(response.data.data.about);
      setphoto(response.data.data.photo)
    } catch (error) {
      console.error("Error fetching photo/about", error);
    }
  };

  return (
    <>
     
      <Container sx={{ width: { xs: "100vw", sm: "80vw" }, backgroundColor: "rgba(173, 216, 230, 0.1);", margin: { xs: "0", sm: "10vh auto" }, padding: "5vh 5vw", borderRadius: { xs: "0px", sm: "15px" }, border: { xs: "none", sm: "0.3px solid black" } }}>
      <Box sx={{display:'flex',justifyContent:'space-between'}}>
               <div>
               <Typography sx={{fontSize:{xs:'17px',sm:'25px'}}} fontWeight={'bold'}>{jobs.role}</Typography>
                <Typography sx={{fontSize:{xs:'15px',sm:'20px'}}}>{jobs.company}</Typography>
               </div>
                {(photo!=null)&&(<Avatar src={photo} sx={{margin:'2vh 5vw',height:{xs:'50px',sm:'80px',md:'100px'},width:{xs:'50px',sm:'80px',md:'100px'},borderRadius:{xs:'3px',sm:'6px',md:'9px'}}} />)}
        </Box>
        <Divider sx={{ margin: "5vh 0" }} />
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "flex-start" }}>
          <Stack direction="column" spacing={{ xs: 0, sm: 1 }} sx={{ margin: "2vh 3vw" }} key={"stack"}>
            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" }, alignItems: "center" }} key={"experience"}>
              <WorkHistory fontSize="small" />&nbsp;{jobs.experience}
            </Typography>
            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }} key={"location"}>
              <Loc fontSize="small" />&nbsp;{jobs.location}
            </Typography>
            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }} key={"money"}>
              <Money fontSize="small" />&nbsp;{jobs.salary}
            </Typography>
            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }} key={"jobtype"}>
              <Calendar fontSize="small" />&nbsp;{jobs.jobtype}
            </Typography>
          </Stack>
        </Box>
        <Divider sx={{ margin: "5vh 0" }} />
        <Box>
          <Typography sx={{ fontSize: { xs: "15px", sm: "17px", md: "19px" }, fontWeight: "bold" }}>About {jobs.company}</Typography>
          <Typography sx={{ fontSize: { xs: "12px", sm: "15px", md: "17px" } }}>{about}</Typography>
        </Box>
        <Divider sx={{ margin: "5vh 0" }} />
        <Box>
          <Typography sx={{ fontSize: { xs: "15px", sm: "17px", md: "19px" }, fontWeight: "bold" }}>About Job</Typography>
          <Typography sx={{ fontSize: { xs: "12px", sm: "15px", md: "17px" } }}>{jobs.aboutjob}</Typography>
          <Typography sx={{ fontSize: { xs: "15px", sm: "17px", md: "19px" }, fontWeight: "bold", margin: "5vh 0" }}>Key responsibilities</Typography>
          <Box sx={{ padding: "0 5vw" }}>
            {jobs.responsibility ? (
              <ul>
                {jobs.responsibility.map((resp, index) => (
                  <li>
                    <Typography sx={{ fontSize: { xs: "12px", sm: "15px", md: "17px" } }} key={index}>
                      {resp}
                    </Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <li key={"unique_resp"}>No responsibilities</li>
            )}
          </Box>
          <Typography sx={{ fontSize: { xs: "15px", sm: "17px", md: "19px" }, fontWeight: "bold", margin: "5vh 0" }}>Skills required</Typography>
          <Box sx={{ padding: "0 5vw" }}>
            {jobs.skills ? (
              <ul>
                {jobs.skills.map((skill, index) => (
                  <li>
                    <Typography sx={{ fontSize: { xs: "12px", sm: "15px", md: "17px" } }} key={index}>
                      {skill}
                    </Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <li key={"unique_skill"}>No skills required</li>
            )}
          </Box>
          <Typography sx={{ fontSize: { xs: "15px", sm: "17px", md: "19px" }, fontWeight: "bold", margin: "5vh 0" }}>Who can apply</Typography>
          <Box sx={{ padding: "0 5vw" }}>
            {jobs.criteria ? (
              <ul>
                {jobs.criteria.map((crit, index) => (
                  <li>
                    <Typography sx={{ fontSize: { xs: "12px", sm: "15px", md: "17px" } }} key={index}>
                      {crit}
                    </Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <li key={"unique_criteria"}>No eligibility criteria</li>
            )}
          </Box>
          <Typography sx={{ fontSize: { xs: "15px", sm: "17px", md: "19px" }, fontWeight: "bold", margin: "5vh 0" }}>Perks</Typography>
          <Box sx={{ padding: "0 5vw" }}>
            {jobs.perks ? (
              <ul>
                {jobs.perks.map((perk, index) => (
                  <li>
                    <Typography sx={{ fontSize: { xs: "12px", sm: "15px", md: "17px" } }} key={index}>
                      {perk}
                    </Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <li key={"unique_perk"}>No Perks</li>
            )}
          </Box>
        </Box>
        <Divider sx={{ margin: "5vh 0" }} />
        <Box>
          <Typography sx={{ fontSize: { xs: "15px", sm: "17px", md: "19px" }, fontWeight: "bold", margin: "2vh 0" }}>Number of openings :</Typography>
          <Typography sx={{ fontSize: { xs: "12px", sm: "15px", md: "17px" } }}>{jobs.openings}</Typography>
          <Typography sx={{ fontSize: { xs: "14px", sm: "17px", md: "19px" }, margin: "5vh 0", display: "flex", alignItems: "center" }}>
            <People fontSize="small" />&nbsp;{jobs.applicants} applicants
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default EmpJobdesc;
