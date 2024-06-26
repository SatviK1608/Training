const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/acid');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.transaction = require('./transaction')(sequelize, Sequelize);

module.exports = db;