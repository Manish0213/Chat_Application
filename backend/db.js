// cHBFFazEQN1pUHgX
const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://ratnawatmanish031:cHBFFazEQN1pUHgX@cluster0.a2sjz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectToDatabase = () => {
    mongoose.connect(mongoURL)
    .then(() => console.log("Connected to the database!"))
    .catch(err => console.error('Database connection error:', err));
};

module.exports = connectToDatabase;