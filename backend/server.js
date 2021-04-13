import express from 'express';
import color from 'colors';

const app = express();

// allow us to accept json body for auth
app.use(express.json());

// show backend is working
app.get('/', (req, res) => {
  res.send('API is running...');
});

// set port
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
