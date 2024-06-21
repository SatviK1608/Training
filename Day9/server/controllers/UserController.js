const User=require("../models/UserModel")
const Section=require("../models/SectionModel")
const Qualification=require("../models/QualificationsModel")


const getUsers =async (req,res,next)=>{
    const users=await User.findAll();
    res.json({data:users})
}

const addUser=async (req,res,next)=>{

    const {name,email,address,paymentMethod,profilePic,section,qualifications}=req.body;
    
    console.log(typeof(address),paymentMethod)
    const result=await User.create({name:name,email:email,profilePic:profilePic,addresses:address,paymentMethods:paymentMethod});
    const sectionname=await Section.findOne({where:{name:section}});
    const qualificationsname=await Qualification.findAll({where:{qualificationname:qualifications}})
    //console.log(sectionname,qualificationsname);
    
    console.log(result)

    sectionname.addUsers(result)
    result.addQualifications(qualificationsname)
    res.json({data:"test"})
}



const deleteUser=async (req,res,next)=>{
    const result=await User.destroy({where:{id:req.body.id}})
    res.json({data:result})
}

const getProfile=async (req,res,next)=>{
    const result=await User.findOne({where:{id:req.body.id}})
    const section=Section.getUsers(result)
    const qualifications=Qualification.getUsers(result);
    res.json({data:result})
}

const updateProfile=async (req,res,next)=>{
    
    
    const {id,name,email,address,paymentMethod,profilePic,section,qualifications}=req.body;
    const find=await User.findOne({id:id})
    const oldqualification=await find.getQualifications();
    await find.removeQualifications(oldqualification)
    const result=await User.update({name:name,email:email,profilePic:profilePic,addresses:address,paymentMethods:paymentMethod},{where:{id:id}})
    const sections=await Section.findOne({where:{name:section}})
    const qualification=await Qualification.findAll({where:{qualificationname:qualifications}})
    sections.addUsers(find)
    find.addQualifications(qualification)
    res.json({data:result})
}

module.exports={getUsers,addUser,deleteUser,getProfile,updateProfile};