const User=require("../models/UserModel")
const Section=require("../models/SectionModel")
const Qualification=require("../models/QualificationsModel")
const UserQualification=require("../models/UserQualificationModel");

const getUsers =async (req,res,next)=>{
    res.json({data:"test"})
}

const addUser=async (req,res,next)=>{
    res.json({data:"test"})
}

const deleteUser=async (req,res,next)=>{
    res.json({data:"test"})
}

const getProfile=async (req,res,next)=>{
    res.json({data:"test"})
}

const updateProfile=async (req,res,next)=>{
    res.json({data:"test"})
}

module.exports={getUsers,addUser,deleteUser,getProfile,updateProfile};