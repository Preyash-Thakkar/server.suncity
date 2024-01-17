const MarketExecutive = require("../models/MarketExecutive");

const createMarketExecutive = async (req, res) => {
  try {
    const existingExecutive = await MarketExecutive.findOne({ email: req.body.email });
    if (existingExecutive) {
      return res.status(200).json({
        success: false,
        message: "Email is already in use",
      });
    }

    const newExecutive = await MarketExecutive.create(req.body);
    res.status(201).json({
      success: true,
      message: "Market executive created successfully",
      data: newExecutive,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const listMarketExecutives = async (req, res) => {
  try {
    const { skip, per_page, sorton, sortdir, match, isActive } = req.body;

    let query = [];

    if (match) {
      query.push({
        $match: {
          $or: [
            { name: { $regex: match, $options: 'i' } },
            { email: { $regex: match, $options: 'i' } },
            { password: {$regex: match, $options:'i'}},
            // Include other fields you want to search by in the $or condition
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

    const list = await MarketExecutive.aggregate(query);
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getMarketExecutiveById = async (req, res) => {

  try {
    const executive = await MarketExecutive.findById(req.params.id);
    if (!executive) {
      return res.status(404).json({ error: "Market executive not found" });
    }
    res.status(200).json({
      success: true,
      data: executive,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateMarketExecutive = async (req, res) => {
  try {
  console.log('Received update request for market executive with ID:', req.params._id)

    const updatedExecutive = await MarketExecutive.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );
    if (!updatedExecutive) {
      return res.status(404).json({ error: "Market executive not found" });
    }
    res.status(200).json({
      success: true,
      message: "Market executive updated!",
      data: updatedExecutive,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteMarketExecutive = async (req, res) => {
  try {
    const deletedExecutive = await MarketExecutive.findByIdAndDelete(req.params._id);
    console.log("dd",req.params._id);
    if (!deletedExecutive) {
      return res.status(404).json({ error: "Market executive not found" });
    }
    res.status(200).json({
      success: true,
      message: "Market executive deleted!",
      data: deletedExecutive,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createMarketExecutive,
  listMarketExecutives,
  getMarketExecutiveById,
  updateMarketExecutive,
  deleteMarketExecutive,
};
