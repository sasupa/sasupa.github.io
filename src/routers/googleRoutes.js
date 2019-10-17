const express = require("express");
const router = express.Router();
const googleUtil = require('./../utils/google-util')


router.get("/", async (req, res) => {

    try {

        const res = await googleUtil.googleUtil;
        console.log(res)

        res.status(200).json({
            status: 'success', data: {
                res
            }
        });


    } catch (err) {
        res.status('400').json({
            message: 'fail',
            err
        });
    }

});


module.exports = router