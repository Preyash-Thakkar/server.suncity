const express = require("express");

const router = express.Router();

const {adminController,changePlotStatus,addPlotRemark,modifyPlotDetails} = require("../controllers/modifications");
router.post('/change-status', adminController.changePlotStatus);
router.post('/add-remark', adminController.addPlotRemark);
router.post('/modify-details', adminController.modifyPlotDetails);

module.exports = router;