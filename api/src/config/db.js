const dotenv = require("dotenv");
const { Sequelize, dataTypes } = require("sequelize");
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: "postgres",
  ssl: { rejectUnauthorized: true },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection Established with Database");
  } catch (error) {
    console.log(`Could not connect to Database: ${error}`);
  }
};

module.exports = { sequelize, connectToDatabase };
