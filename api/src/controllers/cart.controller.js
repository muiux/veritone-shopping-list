const {
  createItem,
  fetchAllItems,
  fetchItemById,
  fetchItemByName,
  update,
  deleteItemById,
} = require("../services/cart.service");

const addItem = async (req, res) => {
  const { name, quantity, description } = req.body;
  try {
    const item = await fetchItemByName(name);
    if (item) {
      return res.status(400).json({ message: "Item already exist." });
    }

    createItem({ name, quantity, description }).then((response) => {
      const status = response ? 200 : 404;
      const message = response ? "Item added successfully" : "Item not added";

      return res.status(status).json({ message, response });
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

const getAllItems = async (req, res) => {
  try {
    const response = await fetchAllItems();
    return res.status(200).json({
      message: "Items retrieved successfully!",
      response,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      err,
    });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetchItemById(id);
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "Item not found!", response });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

const updateItem = async (req, res) => {
  const { name, quantity, description } = req.body;
  const { id } = req.params;
  try {
    const item = await fetchItemById(id);
    if (!item) {
      return res.status(400).json({ message: "Item does not exist" });
    }
    const response = (await update({ id, name, quantity, description }))[1];
    if (response) {
      return res
        .status(200)
        .json({ message: "Item updated successfully", response });
    } else {
      return res.status(404).json({ message: "Item not updated" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await fetchItemById(id);
    if (!item) {
      return res.status(400).json({ message: "Item does not exist" });
    }
    const response = await deleteItemById({ id });
    if (response) {
      return res.status(200).json({ message: "Item deleted successfully" });
    } else {
      return res.status(404).json({ message: "Item not deleted", response });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
