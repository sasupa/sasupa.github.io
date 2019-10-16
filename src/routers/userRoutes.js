const express = require("express")
const authController = require('./../controllers/authController')
const router = express.Router();


router.post('/signUp', authController.signup)
router.post('/login', authController.login)

router.get('/logout', authController.logout)


module.exports = router