const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Transaction extends Model {}
  Transaction.init({
    amount: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, { sequelize, modelName: 'Transaction' });
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Transaction;
};
