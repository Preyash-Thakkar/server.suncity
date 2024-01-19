const SuncityInquries = require("../models/inquries.js");

const listMEInquiries = async (req, res) => {
  try {
    const { skip, per_page , sorton, sortdir, match, status } = req.body;
    const loggedInEmail = req.body.email;

    if (!loggedInEmail) {
      return res.status(400).json({ success: false, message: 'User email not provided' });
    }

    let query = [
      {
        $match: {
          excecutiveEmail: loggedInEmail,
        },
      },
    ];

    if (match) {
      query.push({
        $match: {
          $or: [
            { InquiryName: { $regex: match, $options: 'i' } },
            { InquiryMail: { $regex: match, $options: 'i' } },
            { InquiryMobile: { $regex: match, $options: 'i' } },
            { InquiryPlotnumber: { $regex: match, $options: 'i' } },
            { status: { $regex: match, $options: 'i' } },
          ],
        },
      });
    }

    // Adjust the status query based on the provided status parameter
    if (status && status !== "") {
      query.push({
        $match: {
          status: status,
        },
      });
    }

    const sort = {};
    sort[sorton] = sortdir === 'desc' ? -1 : 1;
    query.push({ $sort: sort });

    query.push({ $skip: parseInt(skip) }, { $limit: parseInt(per_page) });

    const list = await SuncityInquries.aggregate(query);
    console.log("length of the inquiries",list.length);
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { listMEInquiries };
