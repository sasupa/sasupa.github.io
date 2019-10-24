const express = require("express");
const router = express.Router();
const finaController = require('./../controllers/finaController');


router.route('/').get(finaController.getAllFinances);

module.exports = router;