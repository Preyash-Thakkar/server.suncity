const SuncityInquries = require("../models/inquries.js");

const listMEInquiries = async (req, res) => {
  try {
    const { skip = 0, per_page = 10, sorton = 'createdAt', sortdir = 'desc', match, marketExecutive } = req.body;

    let query = [];

    // Add a $match stage to filter by marketExecutive
    if (marketExecutive) {
      query.push({
        $match: {
          marketExecutive: { $regex: marketExecutive, $options: 'i' },
        },
      });
    }

    if (match) {
      query.push({
        $match: {
          $or: [
            { InquiryName: { $regex: match, $options: 'i' } },
            { InquiryMail: { $regex: match, $options: 'i' } },
            { InquiryMobile: { $regex: match, $options: 'i' } },
            { InquiryPlotnumber: { $regex: match, $options: 'i' } },
            { status: { $regex: match, $options: 'i' } }
          ],
        },
      });
    }

    const sort = {};
    sort[sorton] = sortdir === 'desc' ? -1 : 1;
    query.push({ $sort: sort });

    query.push({ $skip: parseInt(skip) }, { $limit: parseInt(per_page) });

    const list = await SuncityInquries.aggregate(query);
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { listMEInquiries };
