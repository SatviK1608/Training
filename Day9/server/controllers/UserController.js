const User=require("../models/UserModel")
const Section=require("../models/SectionModel")
const Qualification=require("../models/QualificationsModel")


const getUsers =async (req,res,next)=>{
    const users=await User.findAll();
    res.json({data:users})
}

const addUser=async (req,res,next)=>{

    let {name,email,address,paymentMethod,profileImage,section,qualifications}=req.body;
    address=JSON.parse(address)
    paymentMethod=JSON.parse(paymentMethod)
    qualifications=JSON.parse(qualifications)
    console.log(paymentMethod);
    const imageUrl = req.file.path; // Cloudinary URL is in req.file.path
    console.log(imageUrl)
    const result=await User.create({name:name,email:email,profilePic:imageUrl,addresses:address,paymentMethods:paymentMethod});
    const sectionname=await Section.findOne({where:{name:section}});
    const qualificationsname=await Qualification.findAll({where:{qualificationname:qualifications}})
    //console.log(sectionname,qualificationsname);
    

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
    let section=await result.getSection();
    let qualification=await result.getQualifications()
    qualification=qualification.map((item)=>{
        return item.qualificationname
    })
    section=section.name
    const data={result,section,qualification}
    res.json({data:data})
}

const updateProfile=async (req,res,next)=>{
    
    
    const {id,name,email,address,paymentMethod,profileImage,section,qualifications}=req.body;
    address=JSON.parse(address)
    paymentMethod=JSON.parse(paymentMethod)
    qualifications=JSON.parse(qualifications)
    console.log(paymentMethod);
    const imageUrl = req.file.path; 
    const find=await User.findOne({id:id})
    const oldqualification=await find.getQualifications();
    await find.removeQualifications(oldqualification)
    const result=await User.update({name:name,email:email,profilePic:imageUrl,addresses:address,paymentMethods:paymentMethod},{where:{id:id}})
    const sections=await Section.findOne({where:{name:section}})
    const qualification=await Qualification.findAll({where:{qualificationname:qualifications}})
    sections.addUsers(find)
    find.addQualifications(qualification)
    res.json({data:result})
}

module.exports={getUsers,addUser,deleteUser,getProfile,updateProfile};