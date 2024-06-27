const Section=require("../models/SectionModel")
const getSections =async (req,res,next)=>{
    try{
    const result=await Section.findAll();
    res.status(200).json({data:result})
    }catch(err){
        res.status(503).json({message:err})
    }
}

const addSection=async (req,res,next)=>{
    try{
    const result=await Section.create({name:req.body.name})
    res.status(202).json({data:"test"})
    }catch(err){
        res.status(503).json({message:err})
    }
}

const deleteSection=async (req,res,next)=>{
    try{
    const result=await Section.destroy({where:{id:req.body.id}})
    res.status(200).json({data:result})
    }catch(err){
        res.status(503).json({message:err})
    }
}

const viewSectionUsers=async (req,res,next)=>{
    try{
    const result=await Section.findOne({where:{id:req.body.id}})
    const users=await result.getUsers();
    res.status(200).json({data:users})
    }catch(err){
        res.status(503).json({message:err})
    }
}

const updateSection=async (req,res,next)=>{
    try{
    const result=await Section.update({name:req.body.name},{where:{id:req.body.id}})
    res.status(202).json({data:result})
    }catch(err){
        res.status(503).json({message:err})
    }
}


module.exports={getSections,addSection,deleteSection,viewSectionUsers,updateSection};

