const express = require("express");
const authController = require('./../controllers/authController');
const router = express.Router();
const User = require("../models/userModel");


router.post('/signUp', authController.signup)
router.post('/login', authController.login)

// router.get("/:id", (req, res) => {
//     const testID = req.params.id
//     console.log(req)
//     res.send({
//         word: "Hello"
//     })
// })

router.get("/:id", async (req, res) => {
	const Users = await User.find();
	// await Calendar.find({}, (err, obj) => {
	// 	console.log(obj)
	// })
	res.send(
		Users
	);
})

router.get('/logout', authController.logout)

module.exports = router