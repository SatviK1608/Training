const path=require("path")
const fs=require('fs')
const express = require("express");
const app = express();
const jwt=require('jsonwebtoken')
const cookieParser=require("cookie-parser")


const ACCESS_TOKEN_SECRET='caa8bf8c1cadf12bb7e73d5fed78a9d2e5071ec36e9ad74fa375f1d1b7e91b86cdc8684458b052529962256b14631376672de80647e5251a744d1651bc2ca451'


const port = 5000;


app.use(express.urlencoded())
app.use(cookieParser())

const auth=(req,res,next)=>{
    try{
        let token=req.headers.authorization;
        if(token){
            token=token.split(" ")[1];
            let user=jwt.verify(token,ACCESS_TOKEN_SECRET);
            req.user=user.username;
        }
        else{
            res.status(401).json({message:"Unauthorized User"})
        }
        next();
    }catch(error){
        res.status(401).json({message:"Unauthorized User"})
    }
}

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
        console.log(accessToken);
        res.cookie("token",accessToken)
        res.status(201).json({message:"Successfull Login"})
      }    
    })
    res.status(401).json({message:"Invalid Login Credentials"});
});

app.get("/home",auth,(req,res)=>{
  console.log(req.cookies)
  res.status(201).json({message:"Welcome to Dashboard page"})
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
