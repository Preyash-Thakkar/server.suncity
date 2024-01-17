const express = require("express");

const router = express.Router();

const {createAdmin,getAllAdmins,ChecksignIn} = require("../controllers/suncityAdmin")

router.post('/admin/create', createAdmin);
router.get('/admin/all', getAllAdmins);
router.get('/users/check-sign-in',ChecksignIn);

module.exports = router;