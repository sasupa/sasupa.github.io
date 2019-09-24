const hbs = require('hbs')
const express = require('express')
const path = require("path")
require("./src/db/mongoose")
const User = require("./src/models/user")

const app = express()
const port = process.env.PORT || 5000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Muuta miten express tulkitsee requesteja
app.use(express.json())

app.get('', (req, res) => {
    res.render('index', {})
})

app.get('/apitest', (req, res) => {
    const apiAnswer = process.env.TEST

    res.send(apiAnswer)
})

app.get("/users/:id", async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
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

app.get("/dashboard", (req, res) => {
    res.render('dashboard', {})
})

app.get('*', (req, res) => {
    res.render('404', {})
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})