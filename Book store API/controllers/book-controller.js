const Book = require('../models/bookSchema')
const mongoose = require('mongoose')

const addNewBook = async (req,res)=>{
    try {
        const newBook = req.body
        // const newCreatedBook = await Book.create(newBook)
        const newCreatedBook = await Book.insertMany(newBook)
        if(newCreatedBook){
          res.status(201).json({
            success:true,
            data:newCreatedBook,
            message:"Book added SuccessFully"
          })
        }
    } catch (error) {
        console.error("Error while adding book:", error.message);
       res.status(404).json({
        success:false,
        message:"Book can not be added"
       })
    }
}

const getAllBooks = async (req,res) =>{
    try {
        const allBooks = await Book.find({})
        if(allBooks?.length > 0){
           res.status(200).json({
            success: true,
            data: allBooks,
            message : "All Books Fetched Succesfully"
           })
        } else {
            res.status(404).json({
            success: false,
            message: "No books found in collection",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something Went Wrong!",
        })
    }
}

const getSingleBookByID = async (req,res) =>{
    try {

        const book = await Book.findById(req.params.id)

        if(book){
            res.status(200).json({
                success: true,
                message: "Book fetched successfully",
                data: book
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
    } catch (error) {
        console.error("Error while fetching book:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const updateBook = async (req, res) => {
  try {
    const updatedNewBook = req.body;
    const getCurrentBookID = req.params.id;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(getCurrentBookID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    // Check if the book exists before updating
    const existingBook = await Book.findById(getCurrentBookID);
    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found with this ID",
      });
    }

    // Validate if title and author already exist (to avoid duplicate records)
    if (updatedNewBook.title && updatedNewBook.author) {
      const duplicateBook = await Book.findOne({
        title: updatedNewBook.title,
        author: updatedNewBook.author,
        _id: { $ne: getCurrentBookID }, 
      });

      if (duplicateBook) {
        return res.status(400).json({
          success: false,
          message: "A book with the same title and author already exists",
        });
      }
    }

    // Perform the update
    const updatedBook = await Book.findByIdAndUpdate(
      getCurrentBookID,
      updatedNewBook,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });

  } catch (error) {
    console.error("Error while updating book:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const deleteBook = async (req, res) => {
    try {
      const getCurrentBookID = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(getCurrentBookID);
  
      if (!deletedBook) {
        res.status(404).json({
          success: false,
          message: "Book is not found with this ID",
        });
      }
  
      res.status(200).json({
        success: true,
        data: deletedBook,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }
  };


module.exports = { addNewBook , getAllBooks , getSingleBookByID , updateBook , deleteBook}