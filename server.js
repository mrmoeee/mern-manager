const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// For our server to know where to look for items
const items = require('./routes/api/items');

const app = express();

// BodyParser MiddleWare
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => console.log('MongoDB connected. . .'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));