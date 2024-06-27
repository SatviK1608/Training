const express=require("express");
const router=express.Router();
const UserController=require("../controllers/UserController")
const upload = require('../utils/multerConfig');

router.get("/getUsers",UserController.getUsers)
router.post("/addUser",upload.single('profileImage'),UserController.addUser)
router.delete("/deleteUser",UserController.deleteUser)
router.post("/getProfile",UserController.getProfile)
router.put("/updateProfile",upload.single('profileImage'),UserController.updateProfile)

module.exports=router;