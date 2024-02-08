const SuncityInquries = require("../models/inquries.js");

const listInquiries = async (req, res) => {
  try {
    const {
      skip,
      per_page,
      sorton,
      sortdir,
      match,
      status,
    } = req.body;

    console.log("skip:", skip);
    console.log("per_page:", per_page);
    console.log("sorton:", sorton);
    console.log("sortdir:", sortdir);

    let pipeline = [];

    if (match) {
      pipeline.push({
        $match: {
          $or: [
            { InquiryName: { $regex: match, $options: "i" } },
            { InquiryMail: { $regex: match, $options: "i" } },
            { InquiryMobile: { $regex: match, $options: "i" } },
            { InquiryPlotnumber: { $regex: match, $options: "i" } },
            { status: { $regex: match, $options: "i" } },
            { excecutiveEmail: { $regex: match, $options: "i" } },
          ],
        },
      });
    }

    if (status && status !== "") {
      pipeline.push({
        $match: {
          status: status,
        },
      });
    }

    // Calculate the total count without applying skip and limit
    const totalCountPipeline = [...pipeline];
    totalCountPipeline.push({ $count: "count" });
    const [totalCountResult] = await SuncityInquries.aggregate(totalCountPipeline);
    const totalCount = totalCountResult ? totalCountResult.count : 0;

    console.log("Total Count:", totalCount);

    // Apply skip and limit stages within the query
    pipeline.push({ $sort: { [sorton]: sortdir === "desc" ? -1 : 1 } });
    pipeline.push({ $skip: parseInt(skip) });
    //pipeline.push({ $limit: parseInt(per_page) });

    const list = await SuncityInquries.aggregate(pipeline);

    console.log("Data length:", list.length);

    res.json({ data: list, total: totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getInquiriesByPlotNumber = async (req, res) => {
  try {
    // Extract plot number from query parameters
    const plotNumber = req.query.plotNumber;
    console.log("plot",plotNumber)

    // Check if plotNumber is provided
    if (!plotNumber) {
      return res.status(400).json({ error: "Plot number is required" });
    }

    // Find the inquiry with the specified plot number
    const inquiry = await SuncityInquries.find({ InquiryPlotnumber: plotNumber });

    // If inquiry not found, return appropriate response
    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found for plot number: " + plotNumber });
    }

    // Extract the details from the inquiry
    // const { InquiryName, InquiryMail, InquiryMobile } = inquiry;

    // Return the details
    res.json( inquiry );
  } catch (error) {
    console.error("Error retrieving inquiry details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




module.exports = { listInquiries , getInquiriesByPlotNumber };
