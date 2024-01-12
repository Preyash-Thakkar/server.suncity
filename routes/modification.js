const express = require("express");

const router = express.Router();

const {createPlotDetail,getPlotDetailById,getActivePlots,getPlotDetails,updatePlotDetail,listPlotDetails,deletePlotDetail} = require("../controllers/modifications");
router.post('/plot/create', createPlotDetail);
router.get('/plot/:_id', getPlotDetailById);
router.get('/plots/active', getActivePlots);
router.get('/plots', getPlotDetails);
router.put('/plot/edit/:_id', updatePlotDetail);
router.post('/plot/list',listPlotDetails)
router.delete('/plot/delete/:_id',deletePlotDetail);

module.exports = router;