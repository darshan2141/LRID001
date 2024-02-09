const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoDbConnectionString = process.env.MONGODB_URI;

mongoose.connect(mongoDbConnectionString).then(() => {
    console.log("Connected");
}).catch((error) => {
    console.log("data base error ==>", error);
})

