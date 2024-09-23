const express = require('express')
const app = express()
const env = require('dotenv').config()
const db = require('./mongoose')
const fs = require('fs')
const morgan = require('morgan')

db(); // mongodb connection
const port = process.env.PORT || 3000
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

// There are 5 types of Middle ware
// * APPLICATON LEVEL MIDDLEWARE
// * ROUTER LEVEL MIDDLEWARE
// * ERROR-HANDLING MIDDLEWARE
// * BUILT-IN MIDDLEWARE
// * THIRD-PARTY MIDDLEWARE

// Application level middleware
app.use((req, res, next) => {
  console.log(req.ip, req.hostname)
  next()
})

// third party MiddleWare
app.use(morgan('default'))

// Built in middle ware use for understand json form data
app.use(express.json()) // parses incoming requests with JSON payloads
// app.use(express.static('public'))

const auth = (req, res, next) => {
  // if (req.query.pass == 123) { // req.query use for take paramiters from url
  if (req.body.pass == 123) { // generally we use req.body for sending senstive data throught form
    next()
  } else {
    res.sendStatus(401)
  }
}

// API - ENDPOINTS - ROUTE
app.get('/', (req, res, next) => { // ROUTER LEVEL MIDDLEWARE
  res.header('Content-Type', 'application/json')
  res.json(data)
  next()
})
app.post('/', auth, (req, res) => { // set auth middleware only this
  res.json({ type: 'post' })
})
app.put('/', (req, res) => {
  res.json({ type: 'put' })
})
app.delete('/', (req, res) => {
  res.json({ type: 'delete' })
})
app.patch('/', (req, res) => {
  res.json({ type: 'patch' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})