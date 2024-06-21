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
  //   address = JSON.parse(address);
  if (!profileImage) profileImage = "";
  addresses = addresses.map((address) => {
    return address.value;
  });
  // paymentMethod=JSON.parse(paymentMethod)
  let paymentMethods = [];
  paymentMethods.push(paymentMethod);
  //   qualifications = JSON.parse(qualifications);
  qualifications = qualifications.map((item) => {
    return item.value;
  });
  console.log(paymentMethod);
  //   const imageUrl = req.file.path; // Cloudinary URL is in req.file.path
  const imageUrl = "";
  console.log(imageUrl);
  const result = await User.create({
    name: name,
    email: email,
    profilePic: imageUrl,
    addresses: addresses,
    paymentMethods: paymentMethods,
  });
  const sectionname = await Section.findOne({ where: { name: section } });
  const qualificationsname = await Qualification.findAll({
    where: { qualificationname: qualifications },
  });
  //console.log(sectionname,qualificationsname);
  sectionname.addUsers(result);
  result.addQualifications(qualificationsname);
  res.json({ data: "test" });
};
const deleteUser = async (req, res, next) => {
  console.log(req.body, "BODY");
  const result = await User.destroy({ where: { id: req.body.id } });
  res.json({ data: result });
};
const getProfile = async (req, res, next) => {
  const result = await User.findOne({ where: { id: req.body.id } });
  let section = await result.getSection();
  let qualification = await result.getQualifications();
  qualification = qualification.map((item) => {
    return item.qualificationname;
  });
  section = section.name;
  const data = { result, section, qualification };
  res.json({ data: data });
};
const updateProfile = async (req, res, next) => {
  // const {
  //   id,
  //   name,
  //   email,
  //   address,
  //   paymentMethod,
  //   profileImage,
  //   section,
  //   qualifications,
  // } = req.body;
  const user = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    paymentMethod: req.body.paymentMethods,
    sectionId: req.body.sectionId,
    qualifications: req.body.qualifications,
    section: req.body.section,
  };
  console.log(req.body, "METHOD");
  // address = JSON.parse(address);
  // paymentMethod = JSON.parse(user.paymentMethod);
  // qualifications = JSON.parse(user.addressqualifications);
  const imageUrl = "";
  const find = await User.findOne({ id: user.id });
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
  console.log(user.address);
  const sections = await Section.findOne({ where: { name: user.section } });
  const qualification = await Qualification.findAll({
    where: { qualificationname: user.qualifications },
  });
  sections.addUsers(find);
  find.addQualifications(qualification);
  res.json({ data: result });
};
module.exports = { getUsers, addUser, deleteUser, getProfile, updateProfile };