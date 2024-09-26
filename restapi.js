const express = require('express')
const app = express()
const db = require('./lib/db')
const cors = require('cors')
const path = require('path')
const productroutes = require('./routes/product')
const userroutes = require('./routes/user')
const authroutes = require('./routes/auth')
const authController = require('./controller/auth')
db()

require('dotenv').config()

const port = process.env.PORT || 3000


// Middleware to verify JWT token for protected routes

// Built in middle ware use for understand json form data
app.use(cors())
app.use(express.json()) // parses incoming requests with JSON payloads
app.use(express.static('build'))
app.use(express.urlencoded())
app.use('/api/v1', authController.verifyToken, productroutes.routes)
app.use('/api/v1', authController.verifyToken, userroutes.routes)
app.use('/auth', authroutes)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})