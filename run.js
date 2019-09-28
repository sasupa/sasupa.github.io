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

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain)

// Laita user router päälle
app.use(userRouter)
app.use(pageRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})