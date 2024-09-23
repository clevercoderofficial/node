const express = require('express')
const app = express()
const env = require('dotenv').config()
const db = require('./mongoose')
const fs = require('fs')

// db(); // mongodb connection
const port = process.env.PORT || 3000
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

// Built in middle ware use for understand json form data
app.use(express.json()) // parses incoming requests with JSON payloads

// products
// API ROUTES, BASE URL example - google.com/api/v1

// C R U D - CREATE READ UPDATE DELETE

// CREATE Post /products
app.post('/products', (req, res) => {
  console.log(req.body)
  data.push(req.body)
  res.json(req.body)
})

// READ Get /products
app.get('/products/', (req, res) => {
  res.json(data)
})

// READ Get /products/:id
app.get('/products/:id', (req, res) => {
  const id = + req.params.id // unary operator to convert string to number
  const product = data.find((p) => p.id === id)
  res.json(product)
})

// UPDATE PUT /products/:id
app.put('/products/:id', (req, res) => {
  const id = +req.params.id;  // unary operator
  const productIndex = data.findIndex(p => p.id === id);
  data[productIndex] = { ...req.body, id: id };
  res.status(200).json(data[productIndex]);
});

// UPDATE PATCH /products/:id
app.patch('/products/:id', (req, res) => {
  const id = +req.params.id;  // unary operator
  const productIndex = data.findIndex(p => p.id === id);
  const product = data[productIndex];
  data[productIndex] = { ...product, ...req.body };
  res.status(200).json(data[productIndex]);
})

// delete DELETE /products/:id
app.delete('/products/:id', (req, res) => {
  const id = +req.params.id;  // unary operator
  const productIndex = data.findIndex(p => p.id === id);
  const deletedProduct = data.splice(productIndex, 1);
  res.status(200).json(deletedProduct);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})