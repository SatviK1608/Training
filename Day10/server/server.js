const express=require("express")
const app=express()
const sequelize=require("./connection/db")
const ProductRoute=require("./routes/ProductRoutes");

const cors=require("cors")





app.use(cors());
app.use(express.json())

app.use("/",ProductRoute);

sequelize.sync()
  .then(() => {
    console.log('PostgreSQL database synced');
  })
  .catch(err => {
    console.error('Error syncing PostgreSQL database:', err);
});


app.listen(5000,()=>{
    console.log(`Connected to http://localhost:5000`);
})


