const express = require("express");
const app = express();
const { Sequelize, DataTypes } = require("sequelize");

app.use(express.json());

const sequelize = new Sequelize(
  "postgres://postgres:123@localhost:5432/postgres"
);

// Define  model
const Country = sequelize.define(
  "country",
  {
    countryName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false, //to dont have createdAt and updatedAt
  }
);

const Capital = sequelize.define(
  "capital",
  {
    capitalName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

//create 1 to 1 relation b/w Country and Capital

//to get getter and setters of country
//if we want our capital to get deleted if country associated with its fk gets deleted than
Country.hasOne(Capital, { foreignKey: "countryId", onDelete: "CASCADE" });

//to get getter and setters of capital although the association remains the same as of hasOne()
//belongsTo doesnt gurrantes one-one as it can also be used in one-many
Capital.belongsTo(Country);

let country, capital;

//adding data

// sequelize.sync({alter:true}).then(()=>{
//     Country.bulkCreate([
//         {countryName:'Spain'},
//         {countryName:'France'},
//         {countryName:'Germany'},
//         {countryName:'England'}
//     ])

//     Capital.bulkCreate([
//         {capitalName:'London'},
//         {capitalName:'Madrid'},
//         {capitalName:'Paris'},
//         {capitalName:'Berlin'},
//     ])
// }).catch((err)=>{
//     console.error('Error syncing PostgreSQL database:', err);
// })

//linking them using setCapital

// sequelize.sync({alter : true})
//   .then(() => {
//     console.log('PostgreSQL database synced');

//     return Capital.findOne({where:{capitalName:'London'}})

//   }).then((data)=>{
//     capital=data;
//     return Country.findOne({where:{countryName:'England'}})
//   }).then((data)=>{
//     country=data;
//     country.setCapital(capital);
//   })
//   .catch(err => {
//     console.error('Error syncing PostgreSQL database:', err);
//   });

//fetching capital name using getCapital

// sequelize.sync({alter : true})
//   .then(() => {
//     console.log('PostgreSQL database synced');
//     return Country.findOne({where:{countryName:'Spain'}})
//   }).then((data)=>{
//     country=data;
//     return country.getCapital();
//   }).then((data)=>{
//     console.log(data.toJSON())
//   })
//   .catch(err => {
//     console.error('Error syncing PostgreSQL database:', err);
// });

//creating country along with its capital using createCapital

// sequelize.sync({alter : true})
//   .then(() => {
//     console.log('PostgreSQL database synced');
//     return Country.create({countryName:'USA'})
//   }).then((data)=>{
//     country=data;
//     return country.createCapital({capitalName:'Washington, D.C.'})
//   }).then((data)=>{
//     console.log(data.toJSON());
//   })
//   .catch(err => {
//     console.error('Error syncing PostgreSQL database:', err);
//   });

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000/`);
});
