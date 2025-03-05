const mongoose = require('mongoose')

const connectToDB = async() =>{
    try {
        await mongoose.connect('mongodb+srv://amishbroemailcom:Password@cluster0.i7soa.mongodb.net/')
        console.log("mongodb is connected successfully !");
    } catch (error) {
        console.error("Mongodb connection failed", error);
        process.exit(1);
    }
}

module.exports = connectToDB