import express from 'express';
import color from 'colors';
import path from 'path';

// import for database
import connectDB from './config/db.js';

// import for enviroment variables
import dotenv from 'dotenv';

// import for routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// import for middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// ------------------------------------------------------

//set up enviroment files
dotenv.config();

// initialized the server
const app = express();

// initialized DB
connectDB();

// allow us to accept json body for auth
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// paypal route
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// making a folder static for uploads
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// // production set up
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/client/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }

// error route need to be at the end
app.use(notFound);
app.use(errorHandler);

// set port
const PORT = process.env.PORT || 5000;

// let us know the server is running
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
