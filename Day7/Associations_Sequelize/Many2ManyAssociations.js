const express = require("express");
const app = express();
const { Sequelize, DataTypes } = require("sequelize");

app.use(express.json());

const sequelize = new Sequelize(
  "postgres://postgres:123@localhost:5432/postgres"
);

//we can implement this using join tables having two foreign key cols referencing
//the pk col of two parent tables

//each fk col can contain multiple occurrences of each fk

const Customer = sequelize.define(
  "customer",
  {
    customerName: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
const Product = sequelize.define(
  "product",
  {
    productName: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const CustomerProduct = sequelize.define(
  "customerProdcut",
  {
    customerProdcutId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  }
);

//customerproduct act as junction model which gets created automatically
Customer.belongsToMany(Product, { through: CustomerProduct });
Product.belongsToMany(Customer, { through: CustomerProduct });

// sequelize.sync({alter:true}).then(()=>{
//     Customer.bulkCreate([
//         {
//             customerName:"WittCode"
//         },
//         {
//             customerName:"Mike"
//         },
//         {
//             customerName:"Greg"
//         },
//         {
//             customerName:"Spencer"
//         },
//     ])

//     Product.bulkCreate([
//         {
//             productName:'laptop'
//         },
//         {
//             productName:'headphones'
//         },
//         {
//             productName:'soccer ball'
//         },
//         {
//             productName:'pencil sharpner'
//         }
//     ])

// }).catch((err)=>{
//     console.log(err);
// })

let customer, product;

//a customer having all products using addProducts

// sequelize.sync({alter:true}).then(()=>{
//     return Customer.findOne({where:{customerName:'WittCode'}})
// }).then((data)=>{
//     customer=data;
//     return Product.findAll();
// }).then((data)=>{
//     product=data;
//     customer.addProducts(product);  //WittCode becomes owner of all products
// }).catch((err)=>{
//     console.error('Error syncing PostgreSQL database:', err);
// })

//a product purhcased by everyone

// sequelize.sync({alter:true}).then(()=>{
//     return Product.findOne({where:{productName:'laptop'}})
// }).then((data)=>{
//     product=data;
//     return Customer.findAll();
// }).then((data)=>{
//     customer=data;
//     product.addCustomers(customer);  //laptop becomes product of all user
// }).catch((err)=>{
//     console.error('Error syncing PostgreSQL database:', err);
// })

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000/`);
});
