const path = require("path")
const hbs = require('hbs')
const express = require('express')
const cookieParser = require('cookie-parser')

// SEC MW
const rateLimit = require('express-rate-limit'); // How many requests accepted
const mongoSanitize = require('express-mongo-sanitize'); // Prevents NoSQL injections
const xss = require('xss-clean'); // Sanitize untrusted HTML (to prevent XSS) 
const helmet = require('helmet'); // A collection of smaller sec headers

// Routers
const userRouter = require("./src/routers/userRoutes")
const pageRouter = require("./src/routers/pageRoutes")
const calRouter = require("./src/routers/calRoutes")
const googleRouter = require('./src/routers/googleRoutes')
const finaRouter = require('./src/routers/finaRouter')
const reminderRouter = require('./src/routers/reminderRoutes')

// Controllers
const authController = require('./src/controllers/authController')
const globalErrorHandler = require("./src/controllers/errorController")
const googleUtil = require("./src/utils/google-util")
const AppError = require('./src/utils/appError');


const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express()


//////////////////////////////
// SEC MW
/////////////////////////////

// rateLimiter gives an acceptable amount of requests in a given time frame
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000, //One hour
  message: 'Maximum number of requests from this IP reached. Please try again in an hour.'
});
app.use('/', limiter);


app.use(express.json({ limit: '10kb' })); // Body parser, reading data from body into req.body. Limit tells how much data is accepted
app.use(mongoSanitize());
app.use(xss());
app.use(helmet());


// Kalenterin funktioita
const bodyParser = require("body-parser");

var db = require('mongoskin').db("mongodb://localhost/testdb", { w: 0 });
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
  //console.log(req.cookies)
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



// MOUNTING THE ROUTERS
app.use('/', pageRouter)
app.use('/users', userRouter)
app.use('/cal', calRouter)
app.use('/finances', finaRouter)
app.use('/reminders', reminderRouter)

// app.use('/google', googleRouter)

// One command for all undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});



// const router = express.Router();
const port = process.env.PORT || 5000;

//Initiating port
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
});

app.use(globalErrorHandler);