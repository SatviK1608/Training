const express=require("express");
const app=express();
const path=require("path");
const fs=require("fs");
const multer=require("multer");
const PORT=5000;


app.use(express.json());
app.use(express.urlencoded()); //form data jo parse krta hai json m

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.readdirSync("./uploads",(err,file)=>{
        if(err){
            fs.mkdir("./uploads",(err)=>{
                if(err){
                    return console.log(err)
                }
                console.log("Directory created successfully")
            })
        }
      })
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
})
  
const upload = multer({ storage: storage })

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "upload.html"));
  });


app.post("/upload",upload.single("file"),(req,res)=>{
    res.send(201).json({message:"File upload successfull"})
})






app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}/`);
})