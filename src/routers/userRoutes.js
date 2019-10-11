const express = require("express")
const router = new express.Router()
const User = require("../models/userModel")
const multer = require('multer')

const upload = multer({
    dest: ""
})

<<<<<<< Updated upstream
// Usereiden HTTP endpointit

router.post("/users", async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }

    // !! Vanha malli ilman async / await
    // user.save().then(() => {
    //     res.send(user)
    // }).catch((error) => {
    //     res.status(400).send(error.message)
    // })
})

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/users", async (req, res) => {
    try {
        const users = await User.find({})
        res.status(201).send(users)
    } catch (e) {
        res.status(500).send(e)
    }

    // !! Vanha malli ilman async / await
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })

})

router.get("/users/:id", async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }

    // !! Vanha malli ilman async / await
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send("User not found")
    //     }

    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

// User päivittämisen HTTP endpoint

router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(404).send("Invalid updates")
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            res.status(404).send("No user with that ID")
        }

        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send("No user with that ID")
        }

        res.send(user)

    } catch (e) {
        res.status(500).send(e)
    }

})

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send()
})
=======
router.post('/signUp', authController.signup)
router.post('/login', authController.login)
>>>>>>> Stashed changes

module.exports = router