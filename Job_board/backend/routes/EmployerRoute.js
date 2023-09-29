const {Router} = require("express")
const {saveemployer,getphotoabout,updatephotoabout,checkemployer,getemployernameid}=require("../controllers/EmployerController")

const router =Router()

router.post("/updatephotoabout",updatephotoabout);
router.post("/saveemployer",saveemployer);
router.post('/checkemployer', checkemployer);
router.post("/getphotoabout",getphotoabout);
router.post("/getemployernameid",getemployernameid)
module.exports=router;
