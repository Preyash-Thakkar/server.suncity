const express = require("express");

const router = express.Router();

const {createPlotDetail,getPlotDetailById,getActivePlots,getPlotDetails,updatePlotDetail} = require("../controllers/modifications");
router.post('/plot/create', plotController.createPlotDetail);
router.get('/plot/:_id', plotController.getPlotDetailById);
router.get('/plots/active', plotController.getActivePlots);
router.get('/plots', plotController.getPlotDetails);
router.put('/plot/:_id', plotController.updatePlotDetail);

module.exports = router;