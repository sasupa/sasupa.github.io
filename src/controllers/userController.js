const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');



exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    // await newUser.save();

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });


});
