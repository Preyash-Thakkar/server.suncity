const PlotDetail = require("../models/plotdetail"); // Replace with the actual model

const createPlotDetail = async (req, res) => {
  try {
    const plotNoExists = await PlotDetail.findOne({ plot_no: req.body.plot_no });
    if (plotNoExists) {
      return res.status(200).json({
        isOk: false,
        field: 1,
        message: "Plot number already exists!",
      });
    }

    const plotDetail = await PlotDetail.create(req.body);
    res.status(200).json({
      isOk: true,
      data: plotDetail,
    });
  } catch (error) {
    console.error("Error from create plot detail", error);
    return res.status(400).send("Create plot detail failed");
  }
};

const getPlotDetailById = async (req, res) => {
  try {
    const plotDetail = await PlotDetail.findOne({ _id: req.params._id }).exec();
    res.json(plotDetail);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

const getActivePlots = async (req, res) => {
  try {
    const activePlots = await PlotDetail.find({ status: "active" }).exec();
    res.json(activePlots);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch active plots",
      success: false,
    });
  }
};

const getPlotDetails = async (req, res) => {
  try {
    const plotDetails = await PlotDetail.find().exec();
    res.json(plotDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch plot details",
      success: false,
    });
  }
};

const updatePlotDetail = async (req, res) => {
  try {
    const updatedPlotDetail = await PlotDetail.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );
    
    if (!updatedPlotDetail) {
      return res.status(404).json({ error: "Plot detail not found" });
    }

    res.status(200).json({
      success: true,
      message: "Plot detail updated!",
      updatedPlotDetail,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

// Export the router
module.exports = {createPlotDetail,getPlotDetailById,getActivePlots,getPlotDetails,updatePlotDetail};
