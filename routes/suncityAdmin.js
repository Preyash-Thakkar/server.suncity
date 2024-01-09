const express = require("express");

const router = express.Router();

const {stakeholderController} = require("../controllers")

router.post('/add-remark', stakeholderController.addPlotRemark);

module.exports = router;