const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


// CREATING A SIGN-IN TOKEN + EXPIRATION
const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // Modifying the dates
        ),
        httpOnly: true //Cookie can't be accessed by the client, browser
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: user
        }
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    //const newUser = await User.create(req.body);
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
        // passwordChangedAt: req.body.passwordChangedAt
    });

    createSendToken(newUser, 201, res);
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

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check if it's there
    let token;

    //Bunch of headers as default, try console.log at app.js at .toISoString
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError('You are not logged in. Please log in to get access.', 401)
        );
    }

    // 2) Verification token

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user exists

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError('The user belonging to this token does no longer exist', 401)
        );
    }
    // 4) Check if user changed password after the token was issued

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                'The user recently changed password. Please login again.',
                401
            )
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE AND ENABLES USER OBJECT (THE LOGGED IN USER) FOR FOLLOWING MIDDLEWARE SUCH AS UPDATEPASSWORD
    req.user = currentUser;

    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'

        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    'You do not have the permission to perform this action',
                    403
                )
            );
        }
        next();
    };
};
exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get uset based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with that email address.', 404));
    }

    // 2) Generate random reset token
    const resetToken = user.createPasswordResetToken();
    // This will deactivate all the validators so we don't have to specify all mandatory fields of the schema to reset and SAVE it

    await user.save({ validateBeforeSave: false }); //the createPasswordResetToken just modifies the data, we need to save it here

    // 3) Send the token to user's email

    const resetURL = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;

    try {
        await sendEmail({
            email: user.email, // === req.body.email
            subject: 'Your password reset token (valid for 10 min)',
            message
        });

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email.'
        });
    } catch (err) {
        user.createPasswordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError('There was an error in sending the email. Try again later.'),
            500
        );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token provided
    /*It's params, because it was defined in routes with /:token, so params.token gives access*/

    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token) //update() marks the string we hash
        .digest('hex');

    // We can check the validness of the token with simple command in Mongoose.
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    // 2) If  the token has not expired, set the new password

    if (!user) {
        return next(new AppError('Token is invalid or expired.', 400));
    }

    /* If no errors, set new password and zero the token and confirmation */

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user

    // 4) Log the user in, send JWT

    createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');

    // 2) Check if POSTed current password is correct

    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is wrong', 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    // this is for the validator. If not declared, it'll cause an error. Here's why:
    /* All the other required field already exist, but not passwordConfirm.   console.log(user); prduces this:
  
  { role: 'user',
    _id: 5d96f4680df5dcf8e464985d,
    name: 'KOKLAUSs',
    email: 'kokeilu2@gmail.com',
    password:
     '$2a$12$0NB9JrGNwdUH3639ae45M.2.A6z1EDMwUKGVNjwUvIycKsmfkQEVy',
    __v: 0 }
    
  THAT'S WHY WE RUN THE MANUAL UPDATE AND MAKE SURE VALIDATOR IS RUN.
  
    */

    await user.save();

    // 4) Log the user in, sen JWT
    createSendToken(user, 200, res);
});
