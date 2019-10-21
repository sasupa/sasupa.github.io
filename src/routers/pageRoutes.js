const express = require("express")
const pageController = require('./../controllers/pageController')
const authController = require('../controllers/authController')

const router = express.Router();

router.get('/', pageController.getFrontPage);
router.get('/dashboard', authController.protect, pageController.getDash);



// router.get('/apitest', (req, res) => {
//     res.send({
//         API_KEY: process.env.GAPI_KEY,
//         CLIENT_ID: process.env.GAPI_CLIENT
//     })
// })

// router.get('*', (req, res) => {
//     res.render('404', {})
// })

module.exports = router