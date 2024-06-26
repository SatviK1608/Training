const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/index');



const app = express();
app.use(bodyParser.json());
app.use(cors());
db.sequelize.sync();



app.post('/transaction', async (req, res) => {
  const { userId, amount } = req.body;

  const t = await db.sequelize.transaction();

  try {
    const user = await db.user.findByPk(userId, { transaction: t });
    if (!user) throw new Error('User not found');

    const transaction = await db.transaction.create({ userId, amount }, { transaction: t });
    await 
    t.commit();
    res.status(201).json(transaction);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
});

app.listen(3001, async () => {
  console.log('Server is running on port 3001');
});
