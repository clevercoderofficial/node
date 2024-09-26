const Product = require('../lib/model/product'); // Assuming the model is defined in a file named Product.js
const ejs = require('ejs')
const path = require('path')

// Model.deleteMany()
// Model.deleteOne()
// Model.find()
// Model.findById()
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndReplace()
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()

exports.getAllProductsSSR = async (req, res) => {
    try {
        const products = await Product.find({});
        ejs.renderFile(path.resolve(__dirname, '../view/index.ejs'), { products: products }, function (err, str) {
            if (err) {
                return res.status(500).send('Error rendering EJS template');
            }
            res.send(str);
        });
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
};

// CREATE Post /products
exports.createproducts = async (req, res) => {
    try {
        const product = new Product(req.body);
        const data = await product.save();
        console.log({ data });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating product' });
    }
};

// READ Get /products
exports.getproducts = async (req, res) => {
    try {
        const { price, title, category, rating, sort, order } = req.query;
        const queryobject = {};

        // Build query object based on filters
        if (price) {
            queryobject.price = price;
        }
        if (rating) {
            // Query based on the rating's "rate" field
            queryobject["rating.rate"] = rating;
        }
        if (title) {
            queryobject.title = { $regex: title, $options: "i" };  // Case-insensitive search for title
        }
        if (category) {
            queryobject.category = { $regex: category, $options: "i" };  // Case-insensitive search for category
        }

        // Initial Product query
        let productsQuery = Product.find(queryobject);

        // Sort if sort parameter exists
        if (sort) {
            productsQuery = productsQuery.sort({ [sort]: order });
        }

        // Pagination logic
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 5;
        let skip = (page - 1) * limit;

        // Apply skip and limit for pagination
        productsQuery = productsQuery.skip(skip).limit(limit).exec();

        // Execute query and get the products
        const products = await productsQuery;

        // Send the response
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching products' });
    }
};


// READ Get /products/:id
exports.getproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching product' });
    }
};

// UPDATE PUT /products/:id
exports.replaceproduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findOneAndReplace({ _id: id }, req.body, { new: true })
        res.status(201).json(product)
    } catch (err) {
        res.status(401).json(err);
    }
};

// UPDATE PATCH /products/:id
exports.updateproduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).json(product)
    } catch (err) {
        res.status(401).json(err);
    }
}

// delete DELETE /products/:id
exports.deleteproduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findOneAndDelete({ _id: id }, { new: true })
        res.status(201).json(product)
    } catch (err) {
        res.status(401).json(err);
    }
}