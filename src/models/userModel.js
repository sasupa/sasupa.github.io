const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name.']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
        unique: true,
        lowercase: true, // not a validator, it transforms the email to lower
        validate: [validator.isEmail, 'Please provide a valid email.']
    },


    role: {
        type: String,
        enum: ['artist', 'manager', 'admin']
        // default: 'artist'
    },

    password: {
        type: String,
        required: [true, 'Provide a password.'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            //this only works on CREATE and SAVE!!!
            // Validator funcs return either true or false.
            validator: function (el) {
                return el === this.password;
            },
            // Standard way of writing a custom validator; below the error message.
            message: 'Passwords are not the same'
        }
    }

});

// MIDDLEWARE

userSchema.pre('save', async function (next) {
    //     //Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with the cost of 12;
    this.password = await bcrypt.hash(this.password, 12);
    // Delete the passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

// Set the passwordChangedAt field is pass has been changed and is not a new user pass. This middleware only runs is something is modified
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000; //1s, making sure JWT is created after the pass has been changed
    next();
});



// INSTANCE METHODS

// Instance methods have to do with the actual user data
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};



// MAKING A MODEL INSTANCE AND EXPORTING IT

const User = mongoose.model('User', userSchema);
module.exports = User;
