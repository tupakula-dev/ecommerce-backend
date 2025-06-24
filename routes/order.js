const express = require("express");
const orderrouter = express.Router();
const Order = require("../models/Order");

orderrouter.post("/order", async (req, res) => {
    try {
      const { userId, items, totalPrice } = req.body;
  
      const newOrder = new Order({
        userId,     // Optional if using auth
        items,
        totalPrice,
      });
  
      await newOrder.save();
      res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  orderrouter.get("/order/:userId", async (req, res) => {
    try {
      const order = await Order.find({ userId: req.params.userId })
        .populate("items.productId") // fetch product details
        .sort({ createdAt: -1 }); // newest orders first
  
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
 
  
  module.exports = orderrouter;
