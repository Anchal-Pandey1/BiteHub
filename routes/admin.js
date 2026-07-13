const express = require("express");
const router = express.Router();

const foodController = require("../controllers/foodController");

// Dashboard
router.get("/dashboard", foodController.dashboard);

// Add Food
router.get("/add-food", foodController.showAddFoodPage);
router.post("/add-food", foodController.addFood);

// Edit Food
router.get("/edit-food/:id", foodController.showEditPage);
router.post("/update-food/:id", foodController.updateFood);

// Delete Food
router.get("/delete-food/:id", foodController.deleteFood);

module.exports = router;
