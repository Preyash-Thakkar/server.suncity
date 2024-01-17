const express = require("express");
const router = express.Router();
const {
  createMarketExecutive,
  listMarketExecutives,
  getMarketExecutiveById,
  updateMarketExecutive,
  deleteMarketExecutive,
} = require("../controllers/MarketExecutive");

// Create Market Executive
router.post("/marketExecutive/create", createMarketExecutive);

// List all Market Executives
router.post("/marketExecutive/list", listMarketExecutives);

// Get Market Executive by ID
router.get("/marketExecutive/:id", getMarketExecutiveById);

// Update Market Executive by ID
router.put("/marketExecutive/update/:_id", updateMarketExecutive);

// Delete Market Executive by ID
router.delete("/marketExecutive/:_id", deleteMarketExecutive);

module.exports = router;