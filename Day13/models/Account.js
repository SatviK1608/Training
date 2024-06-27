module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    });
    return Account;
  };
  