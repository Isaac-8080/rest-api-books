require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');

const PORT = process.env.PORT;
const DB_URI = process.env.MONGODB_URI;

const app = express();

const Router = require('./routes/booksRoute');
const authorRoutes = require('./routes/authorsRoute');

app.use(express.json());

app.use('/api', Router);
app.use('/api/authors', authorRoutes);

mongoose.connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to database");
      console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => console.log('Can not connect to DB', err));
