const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getUser = catchAsync(async (req, res) => {
    // Koska on merkitty reittiin :id-tagilla, pääsee siihen käsiksi paramsin avulla.
    const user = await User.findById(req.params.id);

    if (!user) {
        next(new AppError('There is no user with that id.', 404));
    };

    res.status(200).json({
        status: 'success',
        data: {
            user
        }

    })

});
