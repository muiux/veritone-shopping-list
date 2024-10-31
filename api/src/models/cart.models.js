const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Cart = sequelize.define(
  "cart",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 1,
      max: 3,
      defaultValue: 1,
    },
    description: {
      type: DataTypes.STRING(100),
    },
  },
  {
    timeStamp: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = { Cart };
