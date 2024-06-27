const {DataTypes,Sequelize} = require('sequelize')
const sequelize=require('../connection/db')

class User extends Sequelize.Model {}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profilePic: {
    type: DataTypes.STRING, 
  },
  addresses: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: false,
  },
  paymentMethods: {
    type: DataTypes.ARRAY((DataTypes.STRING)), 
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps:false
});


module.exports=User




