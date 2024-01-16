const PlotModel = require('../models/plotdetail');

const getPlotDetails = async (req, res) => {
  const { plotNumber } = req.params;

  try {
    console.log('Requesting plot details for plot number:', plotNumber);

    const plotDetails = await PlotModel.findOne({ plot_no: plotNumber });

    console.log('Query executed:', { plot_no: plotNumber });

    if (!plotDetails) {
      console.log('Plot details not found for plot number:', plotNumber);
      return res.status(404).json({ error: 'Plot details not found' });
    }

    console.log('Plot details found:', plotDetails);
    res.json(plotDetails);
  } catch (error) {
    console.error('Error fetching plot details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getPlotDetails,
};
