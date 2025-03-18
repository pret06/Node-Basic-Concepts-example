const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(404).json({
            success : false,
            message : "Access denied. No token provided. Please login to continue!"
        })
    }

    //decode this token
    try {
        const decodedtoken = jwt.verify(token , process.env.SECRET_KEY)
        req.userInfo = decodedtoken
        next()

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Access denied. No token provided. Please login to continue!"
        })
    }
}

module.exports = authMiddleware