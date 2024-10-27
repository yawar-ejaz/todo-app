require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const todoRoute = require("./routes/todoRoute");
const connectDb = require("./utils/database");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ADDRESS,
  })
);

connectDb();

app.use("/auth", authRoute);
app.use("/todos", todoRoute);

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
