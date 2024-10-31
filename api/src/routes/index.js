const express = require("express");
const { cartRouter } = require("./cart.router");

const router = express.Router();

router.use("/item", cartRouter);

module.exports = { router };
