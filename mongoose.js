const mongoose = require('mongoose');
const env = require('dotenv').config()

const DB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGODB_CONNECT);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.log('MongoDB Connection Error: ', err);
    }
}

module.exports = DB