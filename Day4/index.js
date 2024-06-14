const path=require("path")
const fs=require('fs')
const express = require("express");
const app = express();
const jwt=require('jsonwebtoken')
const cookieParser=require("cookie-parser")


const ACCESS_TOKEN_SECRET='caa8bf8c1cadf12bb7e73d5fed78a9d2e5071ec36e9ad74fa375f1d1b7e91b86cdc8684458b052529962256b14631376672de80647e5251a744d1651bc2ca451'
const REFRESH_TOKEN_SECRET='95f2ecf52aee72a47a23689a1439ca5d5849384782220fe9bc20c33a4ee058615fc89151a545d5f4fa0ac0f854e54cb04d0865bc28137b90f88905a0c275a283'


const port = 5000;


app.use(express.urlencoded())
app.use(cookieParser())



app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"));
});


app.post("/login", (req, res) => {
    const {username,password}=req.body;
    let data=JSON.parse(fs.readFileSync('./users.txt','utf-8'));
    console.log(data)
    data.map((item)=>{
      if(item.name==username && item.pass==password){ 
        const accessToken=jwt.sign({username:item.name},ACCESS_TOKEN_SECRET)
        res.cookie("token",accessToken)
        return res.redirect('/home')
      }    
    })
    res.send("Invalid Login Credentials");
});

app.get("/home",(req,res)=>{
  console.log(req.cookies)
  if(req.cookies.token!=null){
    const verify=jwt.verify(req.cookies.token,ACCESS_TOKEN_SECRET)
    if(verify)
      res.sendFile(path.join(__dirname, "pages", "dashboard.html"));
    else
      res.redirect("/")
  }
  else{
    res.redirect("/")
  }
    
})
app.get("/logout",(req,res)=>{
    
    res.clearCookie("token")
    res.redirect("http://localhost:5000/");
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
