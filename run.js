const hbs = require('hbs')
const express = require('express')
const path = require("path")
const app = express()
require("./src/db/mongoose")
const User = require("./src/models/user")

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Muuta miten express tulkitsee requesteja
app.use(express.json())

const port = process.env.PORT || 5000;

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {})
})

app.get('/apitest', (req, res) => {
    const apiAnswer = process.env.GAPI_KEY

    res.send(apiAnswer)
})

app.post("/users", async (req, res) => {
    const user = new User (req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get("/dashboard/", (req, res) => {
    res.render('dashboard', {})
})

app.get('*', (req, res) => {
    res.render('404', {})
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

console.log("Server listening on port 8080...")