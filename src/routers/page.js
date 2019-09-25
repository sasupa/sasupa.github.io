const express = require("express")
const router = new express.Router()

// Sivujen HTTP endpointit

router.get('', (req, res) => {
    res.render('index', {})
})

router.get("/dashboard", (req, res) => {
    res.render('dashboard', {})
})

router.get("/board", (req, res) => {
    res.render('board', {})
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