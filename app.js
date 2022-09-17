const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// routes

const productRoute = require("./routes/product.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1/product", productRoute);

module.exports = app;

/*
 "name": "chal",
"description": "chal onk mulloban kine felbo",
"price": 70,
"unit": "kg",
"quantity": 500,
"status": "in-stack"

 */
