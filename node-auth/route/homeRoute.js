const express = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router()

router.get('/Welcome',authMiddleware, (req,res)=>{
    const {userId ,username , role } = req.userInfo

    res.status(200).json({
        message : "welcome to home page",
        user : {
            _id : userId,
            username,
            role
        }
    })
})


module.exports = router