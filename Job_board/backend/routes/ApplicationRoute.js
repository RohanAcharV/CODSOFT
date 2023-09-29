const {Router} = require("express")
const {getapplications_employer,getapplications_user,checkapplication,saveapplication,updateapplicationstatus,rejectapplications}=require("../controllers/ApplicationController")

const router =Router()

router.post("/updateapplicationstatus",updateapplicationstatus);
router.post("/rejectapplications",rejectapplications);
router.post("/getapplications_employer",getapplications_employer);
router.post("/getapplications_user",getapplications_user);
router.post('/checkapplication', checkapplication);
router.post("/saveapplication",saveapplication)
module.exports=router;