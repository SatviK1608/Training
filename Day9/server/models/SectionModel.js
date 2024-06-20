const {DataTypes,Sequelize} = require('sequelize')
const sequelize=require('../connection/db')


class Section extends Sequelize.Model {}
Section.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Section',
  timestamps:false
});

module.exports=Section