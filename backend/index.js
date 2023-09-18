const connectToMongo = require('./db');
const express = require('express')

connectToMongo()
  .then(() => {
    // Your code here
  })
  .catch((err) => {
    // Handle the error
  });
const app = express()
const port = 5000

app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/api/auth', (req, res) => {
//   res.send('Hello this is auth!')
// })
// app.get('/api/v1/signup', (req, res) => {
//   res.send('Hello signup!')
// })

app.listen(port, () => {
  console.log(`MyNotebook backend listening on port ${port}`)
}) 