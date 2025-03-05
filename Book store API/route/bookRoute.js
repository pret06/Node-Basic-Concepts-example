const express = require('express')
const checkDuplicate = require('../middleware/checkDuplicate')

const {
    getAllBooks,
    getSingleBookByID,
    addNewBook,
    updateBook,
    deleteBook
} = require('../controllers/book-controller')

const router = express.Router()

router.get('/get', getAllBooks)
router.get('/get/:id', getSingleBookByID)
router.post('/add', checkDuplicate, addNewBook)
router.put('/update/:id', updateBook)
router.delete('/delete/:id', deleteBook)

module.exports = router

