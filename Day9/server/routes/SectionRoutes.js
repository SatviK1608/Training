const express=require("express");
const router=express.Router();
const SectionController=require("../controllers/SectionController")


router.get("/getSections",SectionController.getSections)
router.post("/addSection",SectionController.addSection)
router.delete("/deleteSection",SectionController.deleteSection)
router.get("/viewSectionUsers",SectionController.viewSectionUsers)
router.put("/updateSection",SectionController.updateSection)

module.exports=router;