// Import necessary modules and models
const express = require('express');
const router = express.Router();
const PlotDetail = require('../models/plotdetail'); 

// Controller for Admin operations
const adminController = {
  // Change the status of the plot
  changePlotStatus: async (req, res) => {
    const { plotNo, newStatus } = req.body;

    try {
      const updatedPlot = await PlotDetail.findOneAndUpdate(
        { plot_no: plotNo },
        { status: newStatus },
        { new: true }
      );

      if (updatedPlot) {
        return res.json({ success: true, message: 'Plot status updated successfully', data: updatedPlot });
      } else {
        return res.status(404).json({ success: false, message: 'Plot not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Add remarks to a plot
  addPlotRemark: async (req, res) => {
    const { plotNo, newRemark } = req.body;

    try {
      const updatedPlot = await PlotDetail.findOneAndUpdate(
        { plot_no: plotNo },
        { $push: { remark: newRemark } },
        { new: true }
      );

      if (updatedPlot) {
        return res.json({ success: true, message: 'Remark added successfully', data: updatedPlot });
      } else {
        return res.status(404).json({ success: false, message: 'Plot not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Modify plot details
  modifyPlotDetails: async (req, res) => {
    const { plotNo, newPlotDetails } = req.body;

    try {
      const updatedPlot = await PlotDetail.findOneAndUpdate(
        { plot_no: plotNo },
        { $set: newPlotDetails },
        { new: true }
      );

      if (updatedPlot) {
        return res.json({ success: true, message: 'Plot details updated successfully', data: updatedPlot });
      } else {
        return res.status(404).json({ success: false, message: 'Plot not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
};


module.exports = {adminController,changePlotStatus,addPlotRemark,modifyPlotDetails};
