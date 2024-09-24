const mongoose = require('mongoose')

const product = new mongoose.Schema({ // object
    id: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, min: [0, 'wrong min price'], max: [200, 'wrong max price'], required: true, }, // validation
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: {
        rate: { type: Number, required: true },
        count: { type: Number, required: true }
    }
});

const Product = mongoose.model('Product', product); // model
module.exports = Product;