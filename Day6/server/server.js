const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const users = require("./models/users");
const {Client}=require('pg');


app.use(cors());
app.use(express.json());

const client=new Client({
  user:'postgres',
  host:'localhost',
  database:'postgres',
  password:'123',
  port:5432,
})

client.connect().then(()=>{
  console.log("Connected to PostgreSQL database");
  // client.query('Insert into users (username) values ($1)',['john'],(err,result)=>{
  //   if(err)
  //     console.error("Error executing query",err)
  //   else
  //   console.log(result.rowCount)
  // client.end();
  // })
}).catch((err)=>{
  console.log("Error connecting to the database",err)
})

app.get("/getUsers", async (req, res) => {
   let data;
   client.query('select * from users',(err,result)=>{
    if(err)
      console.error("Error executing query",err)
    else{
      res.json({data:result.rows})
    }  
  });
  
});

app.post("/addUser", async (req, res) => {
  const { user,id } = req.body;
  client.query('Insert into users (username,id) values ($1,$2)',[user,id],(err,result)=>{
      if(err)
        console.error("Error executing query",err)
      else
        res.json({data:result.rowCount})
    })
});

app.put("/updateUser", async (req, res) => {
  console.log(req.body.user);
 const { id, user } = req.body;
  client.query('Update users set username=($1) where id=($2)',[user,id],(err,result)=>{
    if(err)
      console.error("Error executing query",err)
    else
      res.json({data:result.rowCount})
  })
  //const data = await users.findByIdAndUpdate(id, { user });
});

app.delete("/deleteUser", async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  client.query('delete from users where id=($1)',[id],(err,result)=>{
    if(err)
      console.error("Error executing query",err)
    else
      res.json({data:result.rowCount})
  })
});

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000/`);
});
