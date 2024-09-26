const express = require('express')
const productcontroller = require('../controller/product')
const router = express.Router()
// MVC
router
    .post('/products', productcontroller.createproducts)
    .get('/ssr', productcontroller.getAllProductsSSR)
    .get('/products/', productcontroller.getproducts)
    .get('/products/:id', productcontroller.getproduct)
    .put('/products/:id', productcontroller.replaceproduct)
    .patch('/products/:id', productcontroller.updateproduct)
    .delete('/products/:id', productcontroller.deleteproduct)

exports.routes = router