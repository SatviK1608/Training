const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Op } = require('sequelize');
const db = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(cors());

db.sequelize.sync();

app.post('/products', async (req, res) => {
  const { sort, category, availability, color, brand } = req.body;

  let whereClause = {};
  if (category) {
    whereClause.category = category;
  }
  if (availability) {
    whereClause.availability = availability === 'available';
  }
  if (color) {
    whereClause.color = { [Op.iLike]: `%${color}%` };
  }
  if (brand) {
    whereClause.brand = brand;
  }

  let orderClause = [];
  if (sort === 'low-to-high') {
    orderClause.push(['price', 'ASC']);
  } else if (sort === 'high-to-low') {
    orderClause.push(['price', 'DESC']);
  }

  try {
    const products = await db.products.findAll({
      where: whereClause,
      order: orderClause,
    });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
