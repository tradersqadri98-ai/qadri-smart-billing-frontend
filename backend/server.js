const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const ORDERS_FILE = path.join(__dirname, "orders.json");


// GET ORDERS

app.get("/orders", async (req, res) => {

  try {

    const data = await fs.readJson(ORDERS_FILE);

    res.json(data);

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }

});


// CREATE ORDER

app.post("/orders", async (req, res) => {

  try {

    const existingOrders = await fs.readJson(ORDERS_FILE);

    const newOrder = {
      id: Date.now(),
      ...req.body,
    };

    existingOrders.push(newOrder);

    await fs.writeJson(ORDERS_FILE, existingOrders, {
      spaces: 2,
    });

    res.status(201).json({
      success: true,
      message: "Order Saved",
      order: newOrder,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }

});


const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});