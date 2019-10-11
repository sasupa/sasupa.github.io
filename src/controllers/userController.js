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


exports.login = catchAsync(async (req, res, next) => {
    // Destructuring the req body to get variables
    const { email, password } = req.body;

    // 1) Check if email and password exist

    if (!email || !password) {
        return next(new AppError('Please provide email and password.', 400));
    }

    // 2) Check if user exists and password is correct
    // As pass is hidden by default, we have to manually select() it to include it in the document output – visible in the returned object
    const user = await User.findOne({ email: email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3) if everything is okay, send token to client

    createSendToken(user, 200, res);
});
