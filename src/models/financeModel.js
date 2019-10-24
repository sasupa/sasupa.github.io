const mongoose = require('mongoose');
//const validator = require('validator');




const financeSchema = new mongoose.Schema({
    rahaa: Number,
    paaoma: Number,
    ansio: Number,
    tulos: Number

});


const Finance = mongoose.model('Finance', financeSchema);
module.exports = Finance;