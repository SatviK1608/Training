const express = require("express");
const app = express();
const cors = require("cors");
const { Sequelize, DataTypes } = require('sequelize');



app.use(cors());
app.use(express.json());



const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/postgres');
// Define User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});
// const Tweets = sequelize.define('Tweets', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   }
// });
sequelize.sync()
  .then(() => {
    console.log('PostgreSQL database synced');
  })
  .catch(err => {
    console.error('Error syncing PostgreSQL database:', err);
  });

app.get("/",async(req,res)=>{

})


app.get("/getUsers", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ data: users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.post("/addUser", async (req, res) => {
  const { user, id } = req.body;
  console.log(req.body,user)
  try {
    const newUser = await User.create({ username : user, id });
    res.json({ data: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.put("/updateUser", async (req, res) => {
  const { id, user } = req.body;
  try {
    const [numRowsUpdated] = await User.update({ username:user }, { where: { id } });
    res.json({ data: numRowsUpdated });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: 'Error updating user' });
  }
});

app.delete("/deleteUser", async (req, res) => {
  const { id } = req.body;
  try {
    const numRowsDeleted = await User.destroy({ where: { id } });
    res.json({ data: numRowsDeleted });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000/`);
});
