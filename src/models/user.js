const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }, 
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true, // nyt pitäs toimia ku laitoin run.js'ään app.use(express.json())
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (value.length <= 6) {
                throw new Error("Your password length needs to be more than 6")
            } else if (value.includes("password")) {
                throw new Error("Your password can't contain the word 'password'")
            }
        }
    }
})

//Sitten kun login saadaan toimimaan
// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email })

//     if (!user) {
//         throw new Error("Unable to login")
//     }

//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) {
//         throw new Error("Unable to login")
//     }

//     return user
// }

// Hash the plain text password before saving
userSchema.pre("save", async function(next) {
    const user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User