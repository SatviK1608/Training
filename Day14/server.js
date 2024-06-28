const express = require("express");
const app = express();
const cors = require("cors");
const { Sequelize, DataTypes } = require('sequelize');



app.use(cors());
app.use(express.json());



const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/postgres');
const Record = sequelize.define('Record', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {timestamps:false,
    indexes: [
      {
        unique: false,
        fields: ['firstName', 'lastName']
      }
    ]
});
  

sequelize.sync()
  .then(() => {
    console.log('PostgreSQL database synced');
  })
  .catch(err => {
    console.error('Error syncing PostgreSQL database:', err);
});



app.post('/search', async (req, res) => {
    console.log(req.body)
    const { firstName, lastName } = req.body;
    try {
      const records = await Record.findAll({
        where: {
          firstName,
          lastName
        }
      });
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000/`);
});