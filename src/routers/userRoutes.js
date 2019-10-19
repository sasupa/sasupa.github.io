const express = require("express");
const authController = require('./../controllers/authController');
const router = express.Router();
const userController = require('./../controllers/userController');

////////////////////////////////////////////////////////////////
// AUTHCONTROLLER ROUTES

router.post('/signUp', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)


////////////////////////////////////////////////////////////////
// USERCONTROLLER ROUTES


router.get('/:id', authController.protect, userController.getUser)




module.exports = router