const Product = require('../lib/model/product'); // Assuming the model is defined in a file named Product.js

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

// CREATE Post /products
exports.createproducts = (req, res) => {
    const product = new Product(req.body);
    product.save((err, data) => {
        console.log({ err, data })
        res.json(data);
    });
};

// READ Get /products
exports.getproducts = async (req, res) => {
    const product = await Product.find();
    res.json(product)
}

// READ Get /products/:id
exports.getproduct = async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)
    res.json(product)
}

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
exports.updateproduct = async(req, res) => {
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