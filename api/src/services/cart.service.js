const { Cart } = require("../models/cart.models");

const createItem = async (item) => await Cart.create(item);

const fetchAllItems = async () =>
  await Cart.findAll({ order: [["id", "ASC"]] });

const fetchItemById = async (id) =>
  await Cart.findOne({
    where: { id },
  });

const fetchItemByName = async (name) =>
  await Cart.findOne({
    where: { name },
  });

const update = async ({ id, name, quantity, description }) =>
  await Cart.update(
    { name, quantity, description },
    { where: { id }, returning: true, plain: true }
  );

const deleteItemById = async ({ id }) =>
  await Cart.destroy({
    where: { id },
  });

module.exports = {
  createItem,
  fetchAllItems,
  fetchItemById,
  fetchItemByName,
  update,
  deleteItemById,
};
