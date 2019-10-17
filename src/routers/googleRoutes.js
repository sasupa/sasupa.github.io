const express = require("express");
const router = express.Router();
const googleUtil = require('./../utils/google-util')


router.get("/", async (req, res) => {

    try {

        const result = await googleUtil.urlGoogle;
        console.log(result)

        res.status(200).json({
            status: 'success',
            data: {
                result
            }
        });


    } catch (err) {
        console.log(err)
        res.status('400').json({
            message: 'fail',
            err
        });
    }

});


module.exports = router