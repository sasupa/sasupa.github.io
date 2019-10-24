const express = require("express");
const router = express.Router();
const reminderController = require('./../controllers/reminderController');


router.route('/').get(reminderController.getAllReminders);

module.exports = router;