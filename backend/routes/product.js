const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Product = require("../model/ProductModel");
const Category = require("../model/CatModal");

// Get all products
router.get("/product", (req, res) => {
  Product.find()
    .then((products) => res.json(products)) // Send real data
    .catch((err) =>
      res.status(404).json({
        nopostsfound: "No product found",
      })
    );
});

// Get all categories
router.get("/category", (req, res) => {
  Category.find()
    .then((categories) => res.json(categories)) // Send real data
    .catch((err) =>
      res.status(404).json({
        nocatsfound: "No Category found",
      })
    );
});

// Get all products by specific category name
router.get("/product/:cat_name", (req, res) => {
  Product.find({ routeName: req.params["cat_name"] })
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(404).json({
        nocatsfound: "No product found",
      })
    );
});

module.exports = router;
