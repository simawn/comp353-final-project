const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

router.put('/admin/updatestatus', adminController.updateUserActiveStatus);
router.get('/admin/viewlogs', adminController.getSystemActivity);

module.exports = router;
