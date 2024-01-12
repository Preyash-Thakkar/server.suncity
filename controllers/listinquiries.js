const  SuncityInquries  = require( "../models/inquries.js");

const listInquiries = async (req, res) => {
  try {
    const { skip = 0, per_page = 10, sorton = 'createdAt', sortdir = 'asc', match } = req.body;

    let query = [];

    // Build the match query if provided
    if (match) {
      query.push({
        $match: {
          $or: [
            { InquiryName: { $regex: match, $options: 'i' } },
            { InquiryMail: { $regex: match, $options: 'i' } },
            { InquiryMobile: match },
            { InquiryPlotnumber: match },
            { status: { $regex: match, $options: 'i' } },
          ],
        },
      });
    }

    // Add sorting to the query
    const sort = {};
    sort[sorton] = sortdir === 'desc' ? -1 : 1;
    query.push({ $sort: sort });

    // Add pagination to the query
    query.push({ $skip: Number(skip) }, { $limit: Number(per_page) });

    // Execute the query
    const inquiries = await SuncityInquries.find();
    res.json(inquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { listInquiries };
