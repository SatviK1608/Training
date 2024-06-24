const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/dashboard');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./product.model.js')(sequelize, Sequelize);

module.exports = db;
