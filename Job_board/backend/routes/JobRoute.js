const {Router} = require("express")
const { savejob , fetchjobs,incrementjob,updatehiring,fetchjobdetails}=require("../controllers/JobController")

const router =Router()

router.post("/updatehiring",updatehiring);
router.post("/savejob",savejob);
router.post("/incrementjob",incrementjob);
router.post("/fetchjobs",fetchjobs);
router.post("/fetchjobdetails",fetchjobdetails);

module.exports=router;
