const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectToDB = require('./database/db')
const bookRoutes = require('./route/bookRoute')

dotenv.config()

const PORT = process.env.PORT || 3000

// MiddleWare
app.use(express.json())

// Connect to Database
connectToDB()

// Routes here
app.use('/api/books', bookRoutes)

// Listen to Server
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})



