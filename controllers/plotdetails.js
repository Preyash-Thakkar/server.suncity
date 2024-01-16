const express = require('express');
const router = express.Router();
const PlotModel = require('../models/plotdetail'); // Assume you have a PlotModel for MongoDB

// Route to fetch plot details based on plot number
router.get('/plot-details/:plotNumber', async (req, res) => {
  const { plotNumber } = req.params;

  try {
    const plotDetails = await PlotModel.findOne({ plot_no: plotNumber });
    if (!plotDetails) {
      return res.status(404).json({ error: 'Plot details not found' });
    }

    res.json(plotDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to submit form data
router.post('/submit-form', async (req, res) => {
  const formData = req.body;

  // Perform any necessary validation or processing here

  try {
    // Assuming you have a PlotSubmissionModel for MongoDB
    // Save the form data to the database
    await PlotSubmissionModel.create(formData);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
