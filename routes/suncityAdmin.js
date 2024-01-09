const express = require("express");

const router = express.Router();

const {createAdmin,getAllAdmins} = require("../controllers/suncityAdmin")

router.post('/admin/create', createAdmin);
router.get('/admin/all', getAllAdmins);

module.exports = router;