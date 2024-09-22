const express = require('express')
const app = express()
const env = require('dotenv').config()
const db = require('./mongoose')
const port = process.env.PORT || 3000
const fs = require('fs')
// db(); // mongodb connection

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

// API - ENDPOINTS - ROUTE
app.get('/', (req, res) => {
  res.header('Content-Type', 'application/json')
  res.json(data)
})
app.post('/', (req, res) => {
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