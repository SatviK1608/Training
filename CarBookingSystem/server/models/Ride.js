const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Ride = sequelize.define('Ride', {
  ride_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  car_name: { type: DataTypes.STRING },
  capacity: { type: DataTypes.INTEGER },
  source: { type: DataTypes.STRING },
  destination: { type: DataTypes.STRING },
  fair: { type: DataTypes.FLOAT },
  owner_user_id: { type: DataTypes.INTEGER },
},{timestamps:false});

Ride.hasMany(User, { foreignKey: 'ride_id' });
User.belongsTo(Ride, { foreignKey: 'ride_id' });

module.exports = Ride;
