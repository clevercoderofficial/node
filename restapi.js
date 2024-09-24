const express = require('express')
const app = express()
const env = require('dotenv').config()
const db = require('./lib/db')
const productroutes = require('./routes/product')
db()
const port = process.env.PORT || 3000
// Built in middle ware use for understand json form data
app.use(express.json()) // parses incoming requests with JSON payloads
app.use('/api/v1', productroutes.routes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})