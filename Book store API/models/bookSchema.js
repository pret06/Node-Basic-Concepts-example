const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Book title is required"],
        trim:true,
        maxLength:[100, "Book character can not be more then 100"] 
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    year:{
        type: Number,
        required: [true, "Publication year is required"],
        min: [1000, "Year must be atleast 1000"],
        max: [new Date().getFullYear(), "Year cannot be in the future"],
    },
    createdAt :{
        type:Date,
        default:Date.now
    },
})

BookSchema.index({ title: 1, author: 1 }, { unique: true });


module.exports = mongoose.model('Book', BookSchema);