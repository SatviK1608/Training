const User=require("../models/UserModel")
const Section=require("../models/SectionModel")
const Qualification=require("../models/QualificationsModel")


const getUsers =async (req,res,next)=>{
    const users=await User.findAll();
    res.json({data:users})
}

const addUser=async (req,res,next)=>{
    const result=await User.create({});
    const section=await Section.findOne({where:{name:req.body.section}});
    const qualifications=await Qualification.findAll({where:{qualificationName:[req.body.qualifications]}})
    section.setUser(result)
    qualifications.setUser(result)
    res.json({data:"test"})
}

const deleteUser=async (req,res,next)=>{
    const result=await User.destroy({where:{id:req.body.id}})
    res.json({data:result})
}

const getProfile=async (req,res,next)=>{
    const result=await User.findOne({where:{id:req.body.id}})
    res.json({data:result})
}

const updateProfile=async (req,res,next)=>{
    const result=await User.update({},{where:{id:req.body.id}})
    res.json({data:result})
}

module.exports={getUsers,addUser,deleteUser,getProfile,updateProfile};