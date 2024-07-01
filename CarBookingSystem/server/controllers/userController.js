const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const loginUser=async (req,res)=>{
    const { user_name, password, adminKey } = req.body;
    try {
        const user = await User.findOne({ where: { user_name } });
        if (user && bcrypt.compareSync(password, user.password)) {
        const isAdmin = adminKey && adminKey === process.env.ADMIN_KEY;
        const token = jwt.sign({ userId: user.user_id, isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token)
        return res.json({ token, userId: user.user_id,isAdmin });
        }
        res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const signupUser=async (req,res)=>{
    const { user_name, password, phone_no, email, first_name, last_name } = req.body;
    console.log(req.body)
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await User.create({ user_name, password: hashedPassword, phone_no, email, first_name, last_name });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getUserDetails=async(req,res)=>{
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updateUser=async(req,res)=>{
    
    const {id, user_name, phone_no, email, first_name, last_name } = req.body;
    try {
      const user = await User.update({ user_name, phone_no, email, first_name, last_name }, { where: { user_id: id } });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getUsers=async(req,res)=>{
    try{
        const users = await User.findAll();
        res.json(users);
    }catch(error){
        res.status(500).json({error: error.message})
    }
}
const logOut=async(req,res)=>{
  //destroy token and userid from localstorage
  res.status(200).send("User logged out successfully");
}
module.exports={loginUser,signupUser,getUserDetails,updateUser,getUsers,logOut}