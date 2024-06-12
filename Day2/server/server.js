const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const users = require("./models/users");

app.use(cors());
app.use(express.json());

const db = mongoose
  .connect(
    "mongodb+srv://satvik1608:sidharthsatvik@cluster0.9kagwo0.mongodb.net/User"
  )
  .then(() => console.log("Connected"));

app.get("/getUsers", async (req, res) => {
  const data = await users.find();
  res.json({ data: data });
});

app.post("/addUser", async (req, res) => {
  const { user } = req.body;
  const data = await users.create({ user });
  res.json({ data: data });
});
app.put("/updateUser", async (req, res) => {
  console.log(req.body.user);
  const { id, user } = req.body;
  const data = await users.findByIdAndUpdate(id, { user });
  res.json({ data: data });
});

app.delete("/deleteUser", async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const data = await users.findByIdAndDelete(id);
  res.json({ data: data });
});

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000/`);
});
