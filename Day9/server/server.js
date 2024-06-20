const express=require("express")
const app=express()
const sequelize=require("./connection/db")
const User=require("./models/UserModel")
const Section=require("./models/SectionModel")
const Qualification=require("./models/QualificationsModel")
const UserQualification=require("./models/UserQualificationModel");
const UserRoute=require("./routes/UserRoutes");
const SectionRoute=require("./routes/SectionRoutes");


app.use("/user",UserRoute);
app.use("/section",SectionRoute);

User.belongsTo(Section);
Section.hasMany(User); 

User.belongsToMany(Qualification, { through: UserQualification });
Qualification.belongsToMany(User, { through: UserQualification });


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


