const SuncityInquries = require("../models/inquries.js");

const listInquiries = async (req, res) => {
  try {
    const { skip = 0, per_page = 10, sorton = 'createdAt', sortdir = 'desc', match } = req.body;

    let query = [];

    if (match) {
      query.push({
        $match: {
          $or: [
            { InquiryName: { $regex: match, $options: 'i' } },
            { InquiryMail: { $regex: match, $options: 'i' } },
            { InquiryMobile: { $regex: match, $options: 'i' } },
            { InquiryPlotnumber: { $regex: match, $options: 'i' } },
            { status: { $regex: match, $options: 'i' } },
            { marketExecutive: { $regex: match, $options: 'i' } }, // Include marketExecutive in the $or condition
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

module.exports = { listInquiries };

