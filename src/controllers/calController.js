const Calendar = require('./../models/calendarModel');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError');



// GETTING ALL EVENTS
exports.getAllEvents = catchAsync(async (req, res, next) => {
    const events = await Calendar.find();

    res.status(200).json({
        status: 'success',
        data: {
            events
        }
    });
});


// MAKING A NEW EVENT

exports.createNewEvent = catchAsync(async (req, res, next) => {
    const newEvent = await Calendar.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            newEvent
        }
    });

});


// router.post("/newCalEvent", async (req, res) => {
//     const newEvent = await Calendar.create(req.body);

//     res.status(201).json({
//         status: 'success',
//         data: {
//             newEvent
//         }
//     });
// });
