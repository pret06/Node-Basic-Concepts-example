const express = require("express")
const authMidlleware = require('../middleware/auth-middleware')
const adminMidlleware = require('../middleware/admin-middleware')

const router = express.Router()
const {uploadImageController, fetchImageController} = require('../controllers/image-controller')
const authMiddleware = require("../middleware/auth-middleware")

// Route to upload image
router.post('/upload', authMidlleware , adminMidlleware , uploadImageController)

// Route to get the images
router.get('/get', authMiddleware , fetchImageController)

module.exports = router
