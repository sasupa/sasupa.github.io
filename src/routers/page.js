const express = require("express")
const router = new express.Router()
const authController = require('./../controllers/authController')


// Declaring app for easy middleware use
const app = express()


// Sivujen HTTP endpointit

router.get('', (req, res) => {
    res.render('index', {})
})

// // stillLoggedIn MW check for every single view route to verify that user still has access.
app.use(authController.stillLoggedIn)

router.get("/dashboard", (req, res) => {
    if (true) {
        return res.render('dashboard', {})
    }
    res.render('404', {})
})



router.get('/apitest', (req, res) => {
    res.send({
        API_KEY: process.env.GAPI_KEY,
        CLIENT_ID: process.env.GAPI_CLIENT
    })
})

router.get('*', (req, res) => {
    res.render('404', {})
})

module.exports = router