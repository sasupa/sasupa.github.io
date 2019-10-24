const Reminder = require('./../models/reminderModel');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError');


exports.getAllReminders = catchAsync(async (req, res, next) => {
    const reminders = await Reminder.find();

    res.status(200).json({
        status: 'success',
        data: {
            reminders
        }
    });
});
