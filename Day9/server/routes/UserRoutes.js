const express=require("express");
const router=express.Router();
const UserController=require("../controllers/UserController")


router.get("/getUsers",UserController.getUsers)
router.post("/addUser",UserController.addUser)
router.delete("/deleteUser",UserController.deleteUser)
router.get("/getProfile",UserController.getProfile)
router.put("/updateProfile",UserController.updateProfile)

module.exports=router;