const express = require("express");
const router = express.Router();
const { submitForm } = require("../controllers/inquries");

// Define route to handle form submission
router.post("/submit-form", submitForm);

module.exports = router;
