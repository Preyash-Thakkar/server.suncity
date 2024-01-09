const express = require("express");

const router = express.Router();

const {createPlotDetail,getPlotDetailById,getActivePlots,getPlotDetails,updatePlotDetail} = require("../controllers/modifications");
router.post('/plot/create', createPlotDetail);
router.get('/plot/:_id', getPlotDetailById);
router.get('/plots/active', getActivePlots);
router.get('/plots', getPlotDetails);
router.put('/plot/:_id', updatePlotDetail);

module.exports = router;