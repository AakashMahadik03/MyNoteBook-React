const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/mynotebook";

const connectToMongo = () => {
  return mongoose.connect(mongoURI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
    });
}; 
module.exports = connectToMongo;
