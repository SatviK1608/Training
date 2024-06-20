const User=require("../models/UserModel")
const Section=require("../models/SectionModel")
const Qualification=require("../models/QualificationsModel")


const getSections =async (req,res,next)=>{
    const result=await Section.findAll();
    res.json({data:result})
}

const addSection=async (req,res,next)=>{
    const result=await Section.create({})
    res.json({data:"test"})
}

const deleteSection=async (req,res,next)=>{
    const result=await Section.destroy({where:{id:req.body.id}})
    res.json({data:result})
}

const viewSectionUsers=async (req,res,next)=>{
    const result=await Section.findOne({where:{name:req.body.id}})
    const users=await result.getUser();
    res.json({data:users})
}

const updateSection=async (req,res,next)=>{
    const result=await Section.update({},{where:{id:req.body.id}})
    res.json({data:result})
}


module.exports={getSections,addSection,deleteSection,viewSectionUsers,updateSection};

