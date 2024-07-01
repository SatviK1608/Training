const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const rideRoutes = require('./routes/rideRoutes');
const exp = require('constants');
const authenticateToken = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())

app.use('/api/users', userRoutes);
app.use('/api/rides',authenticateToken, rideRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
