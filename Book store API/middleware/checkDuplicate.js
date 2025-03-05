const Book = require('../models/bookSchema')

const checkDuplicate = async (req,res,next) =>{
    try {
        const {title , author} = req.body
        const existingBook = await Book.findOne({title, author})
       
        if(existingBook){
            // console.log(existingBook)
            return res.status(400).json({
                success : false,
                message : "Can not Re-add Same data, Data already Exists"
            })
        } 

        next()
    } catch (error) {
        console.log("Error while checking for duplicate book:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
    }
}

module.exports = checkDuplicate