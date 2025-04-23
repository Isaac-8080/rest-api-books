require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');

const PORT = process.env.PORT;
const DB_URI = process.env.MONGODB_URI;

const app = express();

const Router = require('./routes/booksRoute');

app.use(express.json());

app.use('/api', Router);

mongoose.connect(DB_URI)
.then(() => {
  app.listen(PORT, () => {
    console.log("connect to database");
    console.log(`server is running on http://127.1.1.0${PORT}`)
  })
})
.catch((err) => console.log('can not connect to db', err)
)
