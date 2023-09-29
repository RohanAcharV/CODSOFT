import Home from './home/Home';
import Jobs from './Jobs/Jobs';
import Jobdesc from './Jobdesc/Jobdesc';
import SignIn from './Signinup/Signin';
import SignUp from './Signinup/Signup';
import DashBoard from './C_DB/DashBoard';
import JobDashBoard from './J_DB/JobDashBoard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import { useState,useEffect } from 'react';

function App() {

  const storedUserEmail = localStorage.getItem('useremail');
  const [useremail, setUserEmail] = useState(storedUserEmail);
  const storedEmployerEmail = localStorage.getItem('employeremail');
  const [employeremail, setEmployerEmail] = useState(storedEmployerEmail);

  const handleLogout = () => {
    localStorage.removeItem("useremail");
    setUserEmail('null');
    localStorage.removeItem("employeremail");
    setEmployerEmail('null');
  };

  useEffect(() => {
    localStorage.setItem('useremail', useremail);  
    localStorage.setItem('employeremail', employeremail);  
  }, [useremail,employeremail]); 

  return (
    <>
    {/* <Home/> */}
    {/* <Jobs/> */}
    {/* <JobDashBoard/> */}
    {/* <Jobdesc/> */}
    {/* <SignIn/> */}
    {/* <SignUp/>  */}
     {/* <DashBoard/> */}

     <Router>
      <Routes>
      <Route path="/" element={<Home email={useremail}  onLogout={handleLogout}/> }></Route>
      {/* <Route path="/jobs" element={<Jobs email={useremail} onLogout={handleLogout}/>}></Route> */}
      <Route path="/jobs/:searchkey?" element={<Jobs email={useremail} onLogout={handleLogout}/>}></Route>
      <Route path="/jobdesc/:jobid" element={<Jobdesc email={useremail}/>}></Route>
    <Route path="/dashboard" element={<DashBoard email={useremail} onLogout={handleLogout}/>}></Route>
    <Route path="/signup" element={<SignUp setuseremail={setUserEmail} setemployeremail={setEmployerEmail}/>}></Route>
    <Route path="/signin/:location?/:jobid?" element={<SignIn setuseremail={setUserEmail} setemployeremail={setEmployerEmail}/>}></Route>
    <Route path="/employerdashboard/*" element={<JobDashBoard email={employeremail} onLogout={handleLogout}/>}></Route>
      </Routes>
     </Router>
    </>
    );
}

export default App;
