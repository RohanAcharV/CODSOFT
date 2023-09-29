const {Router} = require("express")
const {saveuser,updatephotoresume,checkuser,getphotoresume,fetchuserdetails,getnameid}=require("../controllers/UserController")

const router =Router()

router.post("/updatephotoresume",updatephotoresume);
router.post("/fetchuserdetails",fetchuserdetails);
router.post("/saveuser",saveuser);
router.post('/checkuser', checkuser);
router.post("/getphotoresume",getphotoresume)
router.post("/getnameid",getnameid)
module.exports=router;
