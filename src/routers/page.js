const express = require("express")
const router = new express.Router()

// Sivujen HTTP endpointit

router.get('', (req, res) => {
    res.render('index', {})
})

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