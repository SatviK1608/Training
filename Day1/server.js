const path = require("path");
const fs=require('fs');

const express = require("express");
const app = express();

const port = 3000;

app.use(express.static('./public'))
app.use(express.urlencoded())
// app.get('/',(req,res)=>{
//     res.send("Hello World")
//     console.log(process.env.PORT)
// })
// app.get("/index",(req,res)=>{
//     res.sendFile(path.join(__dirname,"index.html"))
// })

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"));
});

app.post("/login", (req, res) => {
  const {username,password}=req.body;
  let data=JSON.parse(fs.readFileSync('./users.txt','utf-8'));
  console.log(data)
  data.map((item)=>{
    if(item.name==username && item.pass==password)
        return res.send("Login Successfull");
  })
  res.send("Invalid Login Credentials");
});

app.get("/sign", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "signup.html"));
});
app.post("/sign", (req, res) => {
  let data=JSON.parse(fs.readFileSync('./users.txt','utf-8'));
  const {username,email,phone,password}=req.body;
  let userobj={name:username,pass:password};
  //console.log(userobj);
  data.push(userobj);
  fs.writeFileSync('./users.txt',JSON.stringify(data))
  res.redirect('/')
  
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
