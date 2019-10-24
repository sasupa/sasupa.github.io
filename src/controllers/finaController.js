const Finance = require('./../models/financeModel');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError');


exports.getAllFinances = catchAsync(async (req, res, next) => {
    const finances = await Finance.find();

    res.status(200).json({
        status: 'success',
        data: {
            finances
        }
    });
});
