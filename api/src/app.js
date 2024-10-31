const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectToDatabase, sequelize } = require("./config/db");
const { router } = require("./routes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:8000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connectToDatabase();
  await sequelize.sync({ force: true });

  console.log(`server is running on port ${PORT}`);
});

module.exports = app;
