const PlotDetail = require("../models/plotdetail");


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

    // Include 'remarks' in the req.body if it's part of the data you receive
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

module.exports = { createPlotDetail };





const listPlotDetails = async (req, res) => {
  try {
    const { page, per_page, sorton, sortdir, match, isActive } = req.body;

    console.log("page:", page);
    console.log("per_page:", per_page);
    console.log("sorton:", sorton);
    console.log("sortdir:", sortdir);

    let query = {};

    if (match) {
      query.$or = [
        { plot_no: { $regex: match, $options: 'i' } },
        { status: { $regex: match, $options: 'i' } },
        { remarks: { $regex: match, $options: 'i' } },
      ];
    }

    // Calculate the total count without applying skip and limit
    const totalCount = await PlotDetail.countDocuments(query);

    console.log("Total Count:", totalCount);

    // Apply sorting logic
    let sort = {};
    if (sorton && sortdir) {
      sort[sorton] = sortdir === 'desc' ? -1 : 1;
    } else {
      sort["createdAt"] = -1; // Default sorting by createdAt if sorton and sortdir are not provided
    }

    // Calculate the skip value based on the page number and page size
    const skip = (page - 1) * per_page;

    // Find documents, apply sorting, and skip
    const list = await PlotDetail.find(query)
      .sort(sort)
      .skip(skip)
      .exec();

    console.log("Data length:", list.length);

    res.json({ data: list, total: totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const updatePlotDetail = async (req, res) => {
  try {
    const updatedPlotDetail = await PlotDetail.findByIdAndUpdate(
      req.params._id,
      { ...req.body, remarks: req.body.remarks }, // Include 'remarks' field here
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

const deletePlotDetail = async (req, res) => {
  try {
    const deletedPlotDetail = await PlotDetail.findByIdAndDelete(req.params._id);

    if (!deletedPlotDetail) {
      return res.status(404).json({ error: "Plot detail not found" });
    }

    res.status(200).json({
      success: true,
      message: "Plot detail deleted!",
      deletedPlotDetail,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

const listSoldProducts = async (req, res) => {
  try {
    const { skip, per_page, sorton, sortdir, match, status } = req.body;
    console.log("skip", skip);
    console.log("per-page", per_page);
    console.log("sorton", sorton);
    console.log("sortdir", sortdir);
    console.log("match", match);

    let query = [];

    // Filter by status: 'sold'
    query.push({
      $match: { status: 'sold' }
    });

    if (match) {
      query.push({
        $match: {
          $or: [
            { plot_no: { $regex: match, $options: 'i' } },
            { buyerName: { $regex: match, $options: 'i' } }, // Search in description
            { buyerEmail: { $regex: match, $options: 'i' } },
            { buyerMobileNo: { $regex: match, $options: 'i' } } // Search in category
            // Add other fields as needed
          ],
        },
      });
    }

    if (sorton && sortdir) {
      const sort = {};
      sort[sorton] = sortdir === 'desc' ? -1 : 1;
      query.push({ $sort: sort });
    } else {
      const sort = { name: 1 }; // Default sorting field
      query.push({ $sort: sort });
    }

    query.push({ $skip: skip }, { $limit: per_page });

    const list = await PlotDetail.aggregate(query);
    console.log("list", list);
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



// Export the router
module.exports = {createPlotDetail,listSoldProducts,getPlotDetailById,getActivePlots,deletePlotDetail,getPlotDetails,updatePlotDetail,listPlotDetails};
