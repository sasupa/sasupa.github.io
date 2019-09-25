const path = require("path")
const hbs = require('hbs')
const express = require('express')
require("./src/db/mongoose")
const userRouter = require("./src/routers/user")
const pageRouter = require("./src/routers/page")

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

// Laita user router päälle
app.use(userRouter)
app.use(pageRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})