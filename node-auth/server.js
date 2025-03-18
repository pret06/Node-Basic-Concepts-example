require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const authRoutes = require('./route/authRoute')
const homeRoute = require('./route/homeRoute')
const adminRoute = require('./route/adminRoute')
const uploadRoute = require('./route/imageRoute')
const connectToDB = require('./database/db')

//database connection
connectToDB()

//Middleware
app.use(express.json())

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/home', homeRoute)
app.use('/api/admin',adminRoute )
app.use('api/image', uploadRoute)

app.listen(PORT , ()=>{
    console.log(`Server is working on PORT${PORT}`)
})