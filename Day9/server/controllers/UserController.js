const User = require("../models/UserModel");
const Section = require("../models/SectionModel");
const Qualification = require("../models/QualificationsModel");
const getUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.json({ data: users });
};
const addUser = async (req, res, next) => {
  console.log(req.file);
  let {
    name,
    email,
    addresses,
    paymentMethod,
    profileImage,
    section,
    qualifications,
  } = req.body;
  if (!profileImage) profileImage = "";
  addresses = addresses.map((address) => {
    return address.value;
  });
  let paymentMethods = [];
  paymentMethods.push(paymentMethod);

  qualifications = qualifications.map((item) => {
    return item.value;
  });
  console.log(paymentMethod);
  let imageUrl = req.file||""; // Cloudinary URL is in req.file.path
  if(imageUrl!=""){
    imageUrl=imageUrl.path
  }
  console.log(imageUrl,"image")
  try {
    const result = await User.create({
      name: name,
      email: email,
      profilePic: imageUrl,
      addresses: addresses,
      paymentMethods: paymentMethods,
    });
    let sectionname = await Section.findOne({ where: { name: section } });
    if (!sectionname) {
      sectionname = await Section.findOne({ where: { name: "A1" } });
    }
    const qualificationsname = await Qualification.findAll({
      where: { qualificationname: qualifications },
    });

    sectionname.addUsers(result);
    result.addQualifications(qualificationsname);
    res.status(202).json({ data: "test" });
  } catch (err) {
    res.status(503).json({ message: err });
  }
};
const deleteUser = async (req, res, next) => {
  console.log(req.body, "BODY");
  try {
    const result = await User.destroy({ where: { id: req.body.id } });
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(503).json({ message: err });
  }
};
const getProfile = async (req, res, next) => {
  try {
    const result = await User.findOne({ where: { id: req.body.id } });
    let section = await result.getSection();
    let qualification = await result.getQualifications();
    qualification = qualification.map((item) => {
      return item.qualificationname;
    });
    section = section.name;
    const data = { result, section, qualification };
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(503).json({ message: err });
  }
};
const updateProfile = async (req, res, next) => {
  
  const user = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    paymentMethod: req.body.paymentMethods,
    sectionId: req.body.sectionId,
    qualifications: req.body.qualifications,
    section: req.body.section,
    profileImage:req.body.profileImage
  };
  console.log(req.body, "METHOD");
  let imageUrl ;
  try{
  const find = await User.findOne({where: {id: user.id} });
  
  if(req.file){
    imageUrl=req.file.path
  }else{
    imageUrl=find.dataValues.profilePic;
  }
  const oldqualification = await find.getQualifications();
  await find.removeQualifications(oldqualification);
  const result = await User.update(
    {
      name: user.name,
      email: user.email,
      profilePic: imageUrl,
      addresses: user.address,
      paymentMethods: user.paymentMethod,
    },
    { where: { id: user.id } }
  );
  const sections = await Section.findOne({ where: { name: user.section } });
  const qualification = await Qualification.findAll({
    where: { qualificationname: user.qualifications },
  });

  await sections.addUsers(find);
  console.log(qualification,"new")
  await find.addQualifications(qualification);
  res.status(202).json({ data: result });
}catch(err){
  res.status(503).json({ message: err });
}
};
module.exports = { getUsers, addUser, deleteUser, getProfile, updateProfile };
