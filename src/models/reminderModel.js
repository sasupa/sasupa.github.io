const mongoose = require('mongoose');
//const validator = require('validator');

const reminderSchema = new mongoose.Schema({
    reminder: String,
    userid: String

});

const Reminder = mongoose.model('Reminder', reminderSchema);
module.exports = Reminder;