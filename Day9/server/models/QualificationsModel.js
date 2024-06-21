const {DataTypes,Sequelize} = require('sequelize')
const sequelize=require('../connection/db')


class Qualification extends Sequelize.Model {}
Qualification.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  qualificationname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Qualification',
  timestamps:false
});


module.exports=Qualification;