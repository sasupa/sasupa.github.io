const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController.js');
const calController = require('./../controllers/calController');


// /cal endpointiin on nyt tiivistetty sekä kaikkien eventtien hakeminen että uuden eventin luominen. Requestin tyyppi (post tai get) määrittää, mitä tapahtuu. Molemmat reitit nyt varattu vaan kirjautuneille.

router
	.route('/')
	.get(authController.protect, calController.getAllEvents)
	.post(authController.protect, calController.createNewEvent);



module.exports = router

// Tää koko file on kopioitu node-scheduler-demo-masterista, tbh en oo ihan varma miten toimii

// Ja tää allaoleva pitäs tunkkaa run.js:ään että 

// const calRouter = require("./src/routers/calRoutes")
// const bodyParser = require("body-parser");
// var db = require('mongoskin').db("mongodb://localhost/testdb", { w: 0});
// 	db.bind('event'); TÄÄHÄN TOKI PITÄS KORVAA OMALLA MONGOLLA
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(calRouter)

// Ja tähän loppuu toi mikä pitäs tunkkaa run.js:ään

// router.get('/init', function(req, res){
// 	db.event.insert({ 
// 		text:"My test event A", 
// 		start_date: new Date(2018,8,1),
// 		end_date:	new Date(2018,8,5)
// 	});
// 	db.event.insert({ 
// 		text:"My test event B", 
// 		start_date: new Date(2018,8,19),
// 		end_date:	new Date(2018,8,24)
// 	});
// 	db.event.insert({ 
// 		text:"Morning event", 
// 		start_date: new Date(2018,8,4,4,0),
// 		end_date:	new Date(2018,8,4,14,0)
// 	});
// 	db.event.insert({ 
// 		text:"One more test event", 
// 		start_date: new Date(2018,8,3),
// 		end_date:	new Date(2018,8,8),
// 		color: "#DD8616"
// 	});

// 	res.send("Test events were added to the database")
// });


// router.get('/data', function(req, res){
// 	db.event.find().toArray(function(err, data){
// 		//set id property for all records
// 		for (var i = 0; i < data.length; i++)
// 			data[i].id = data[i]._id;

// 		//output response
// 		res.send(data);
// 	});
// });


// router.post('/data', function(req, res){
// 	var data = req.body;
// 	var mode = data["!nativeeditor_status"];
// 	var sid = data.id;
// 	var tid = sid;

// 	delete data.id;
// 	delete data.gr_id;
// 	delete data["!nativeeditor_status"];


// 	function update_response(err, result){
// 		if (err)
// 			mode = "error";
// 		else if (mode == "inserted")
// 			tid = data._id;

// 		res.setHeader("Content-Type","application/json");
// 		res.send({action: mode, sid: sid, tid: tid});
// 	}

// 	if (mode == "updated")
// 		db.event.updateById( sid, data, update_response);
// 	else if (mode == "inserted")
// 		db.event.insert(data, update_response);
// 	else if (mode == "deleted")
// 		db.event.removeById( sid, update_response);
// 	else
// 		res.send("Not supported operation");
// });