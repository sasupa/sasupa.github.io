const mongoose = require('mongoose');
const validator = require('validator');
const User = require("../models/userModel");

const calendarSchema = new mongoose.Schema({
    start: {
        type: String
    },

    description: {
        type: String
    },

    location: {
        type: String
    },

    end: {
        type: String
    },

    title: {
        type: String
    },

    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    eventId: {
        type: String
    },
},

    // {
    //     // Including virtuals
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true }
    // }

);

// POPULATING USER
calendarSchema.pre(/^find/, function (next) {
    //Populate gets data from child reference with one command

    this.populate({
        path: 'userID',
        select: '-_id name email'
    });
    next();
});

// MAKING A MODEL INSTANCE AND EXPORTING IT

const Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;