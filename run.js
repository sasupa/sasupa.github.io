const hbs = require('hbs')
const express = require('express')
const path = require("path")
const app = express()

// Define paths for Express config
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

const port = process.env.PORT || 5000;

app.get('', (req, res) => {
    res.render('index', {})
})

app.get("/dashboard/", (req, res) => {
    res.render('dashboard', {})
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

console.log("Server listening on port 8080...")