const path=require("path")
const fs=require('fs')
const express = require("express");
const app = express();
const cookieParser=require("cookie-parser")



const port = 5000;


app.use(express.urlencoded())
app.use(cookieParser())



app.get("/", async (req, res) => {
  console.log(req.cookies)
    if(req.cookies.username)
        res.redirect("http://localhost:5000/home")
    res.sendFile(path.join(__dirname, "pages", "login.html"));
  });
// app.get("/login",(req, res) => {
//     //console.log(req.session)
//     //if(req.session.username)
//         res.redirect("http://localhost:5000/home")
//     res.send("hisss")

// })
app.post("/login", (req, res,next) => {
    const {username,password}=req.body;
    console.log(username,password)
    let data=JSON.parse(fs.readFileSync('./users.txt','utf-8'));
    //console.log(data)
    data.map((item)=>{
      if(item.name==username && item.pass==password){
           console.log("true")
          //req.session.username=item.name;
          res.cookie('username',`${item.name}`)
          res.redirect('http://localhost:5000/home');
          next()
      }    
    })
    res.send("Invalid Login Credentials");
});

app.get("/home",(req,res)=>{
  if(req.cookies.username)
    return res.sendFile(path.join(__dirname, "pages", "dashboard.html"));
res.redirect("/")
})
app.get("/logout",(req,res)=>{
    //req.session.destroy();
    res.clearCookie("username")
    res.redirect("http://localhost:5000/");
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
