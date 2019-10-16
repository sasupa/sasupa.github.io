const path = require("path")
const hbs = require('hbs')
const express = require('express')
const cookieParser = require('cookie-parser')
const userRouter = require("./src/routers/userRoutes")
const pageRouter = require("./src/routers/page")
const calRouter = require("./src/routers/calRoutes")
const authController = require('./src/controllers/authController')
const globalErrorHandler = require("./src/controllers/errorController")
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express()
const port = process.env.PORT || 5000;

// Kalenterin funktioita
const bodyParser = require("body-parser");

var db = require('mongoskin').db("mongodb://localhost/testdb", { w: 0});
	db.bind('event');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

//ENV VARIABLES ACCESS
dotenv.config({ path: './global.env' });

//DB + MONGOOSE connection options
const DB = process.env.DATABASE.replace(
  '<PASSU>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true // Tää estää deprication err, en tiiä vittu miksi
  })
  .then(() => console.log('DB connection successful!'));


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Muuta miten express tulkitsee requesteja
app.use(express.json())


app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Test MIDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies)
  next();
})




var allowCrossDomain = function (req, res, next) {
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

app.use('/users', userRouter)
app.use('/cal', calRouter)
app.use(pageRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
});

app.use(globalErrorHandler);