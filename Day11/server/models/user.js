const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class User extends Model {}
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, { sequelize, modelName: 'User' });
  return User;
};
