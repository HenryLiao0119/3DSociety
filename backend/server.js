import express from 'express';
import color from 'colors';

// import for database
import connectDB from './config/db.js';

// import for enviroment variables
import dotenv from 'dotenv';

// ------------------------------------------------------

//set up enviroment files
dotenv.config();

// initialized the server
const app = express();

// initialized DB
connectDB();

// allow us to accept json body for auth
app.use(express.json());

// send to port with the message
app.get('/', (req, res) => {
  res.send('API is running...');
});

// set port
const PORT = process.env.PORT || 5000;

// let us know the server is running
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
