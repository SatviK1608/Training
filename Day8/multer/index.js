const express = require("express");
const app = express();
const cors = require("cors");
const { Sequelize, DataTypes } = require('sequelize');
const multer=require("multer");

app.use(cors());
app.use(express.json());


const upload=multer({storage:multer.memoryStorage()});



const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/postgres');
// Define User model
const User = sequelize.define('ToDoUser', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
  }
},{
  timestamps:false
});
const Files = sequelize.define('Files', {
  file: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps:false
});
sequelize.sync()
  .then(() => {
    console.log('PostgreSQL database synced');
  })
  .catch(err => {
    console.error('Error syncing PostgreSQL database:', err);
  });

app.get("/",async(req,res)=>{

})

User.hasMany(Files,{onDelete:"CASCADE"});

app.get("/getUsers", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ data: users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.get('/getPosts/:id',async(req,res)=>{
  console.log(req.params.id)
  try{
  const user=await User.findOne({where:{id:req.params.id}})
  const data=await user.getFiles()
  console.log(data)
  res.json({data:data});
  }catch(error){
    console.error("Error fetching users:", err);
    res.status(500).json({ error: 'Error fetching posts' });
  }
})

app.post("/addUser",upload.single('file'), async (req, res) => {
  const f=req.file.buffer
  const fname=req.file.originalname
  const { user, id } = req.body;
  console.log(req.body)
  let result=await User.findOne({where:{username:user}})
  if(!result){
    result=await User.create({username:user,id:parseInt(id)})
  }
  let fileResult=await Files.create({file:f,fileName:fname})
  await result.addFiles(fileResult)
  
    
    console.log(f);
  // try {
  //   const newUser = await User.create({ username : user, id });
  //   res.json({ data: newUser });
  // } catch (err) {
  //   console.error("Error creating user:", err);
  //   res.status(500).json({ error: 'Error creating user' });
  // }
  res.json({message:"Done"})
});

app.put("/updateUser", async (req, res) => {
  const { id, user } = req.body;
  try {
    const [numRowsUpdated] = await User.update({ username:user }, { where: { id :parseInt(id) } });
    res.json({ data: numRowsUpdated });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: 'Error updating user' });
  }
});

app.delete("/deleteUser", async (req, res) => {
  const { id } = req.body;
  try {
    const numRowsDeleted = await User.destroy({ where: { id : parseInt(id) } });
    res.json({ data: numRowsDeleted });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000/`);
});
