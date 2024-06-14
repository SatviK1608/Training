const path=require("path")
const fs=require('fs')
const express = require("express");
// const cookie=require("cookie-parser")
const session=require("express-session")
const app = express();

const port = 5000;

// app.use(session({
//     resave:false,
//     saveUninitialized:true,
//     secret:"yehMeraSecretHai",
// }))
app.set('trust proxy', 1) 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))

app.use(express.urlencoded())



app.get("/", (req, res) => {
    console.log(req.session)
    if(req.session.username)
        res.redirect("http://localhost:5000/home")
    res.sendFile(path.join(__dirname, "pages", "login.html"));
  });
app.get("/login",(req, res) => {
    console.log(req.session)
    if(req.session.username)
        res.redirect("http://localhost:5000/home")
    res.send("hisss")

})
app.post("/login", (req, res,next) => {
    const {username,password}=req.body;
    console.log(username,password)
    let data=JSON.parse(fs.readFileSync('./users.txt','utf-8'));
    //console.log(data)
    data.map((item)=>{
      if(item.name==username && item.pass==password){
           console.log("true")
          req.session.username=item.name;
          res.redirect('http://localhost:5000/home');
          next()
      }    
    })
    res.send("Invalid Login Credentials");
});

app.get("/home",(req,res)=>{
  if(req.session.username)
    return res.sendFile(path.join(__dirname, "pages", "dashboard.html"));
  res.redirect("/")
})
app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("http://localhost:5000/");
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
