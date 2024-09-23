const mongoose = require('mongoose');
const env = require('dotenv').config()

const DB = () => {
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.MONGODB_CONNECT)
        .then(() => {
            console.log('MongoDB Connected...');
        }).catch((err) => {
            console.log('MongoDB Connection Error: ', err);
        })
}

module.exports = DB