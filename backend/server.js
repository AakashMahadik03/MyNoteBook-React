// const express = require('express');
// const app = express();
// const PORT = 5000; // Your desired port

// // Import the connectToMongo function from db.js
// const connectToMongo = require('./db');

// // Use the connectToMongo function to establish the MongoDB connection
// connectToMongo()
//   .then(() => {
//     // Define your routes and middleware here

//     // Example route
//     app.get('/api/data', (req, res) => {
//       // Perform some MongoDB query
//       // For example, let's assume you have a "Data" model
//       // and you want to find all documents in the "data" collection
//       Data.find({}, (err, data) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//           res.json(data);
//         }
//       });
//     });

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB:', err);
//   });
