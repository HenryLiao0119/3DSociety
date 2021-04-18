// import for model
import mongoose from 'mongoose';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

// import for util
import dotenv from 'dotenv';
import colors from 'colors';

// import for data
import users from './data/users.js';
import products from './data/products.js';

// import for database
import connectDB from './config/db.js';

// --------------------------------------------------------

// initial enviroment variable
dotenv.config();

// connect to database
connectDB();

// import data
const importData = async () => {
  try {
    // clear collection returns promise
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // grab all the users
    const createdUser = await User.insertMany(users);

    // find the admin user
    const adminUser = createdUser[0]._id;

    // map through the products and set the user with admin user
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // import the data
    await Product.insertMany(sampleProducts);

    // shows data is import and exits
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    // shows the error in red in console and exits
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destoryData = async () => {
  try {
    // clear all data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // shows data clear and exits
    console.log('Data Destoryed!'.red.inverse);
    process.exit();
  } catch (error) {
    // shows the error in red in console and exits
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// node backend/seeder to import
if (process.argv[2] === '-d') {
  // with a -d at the end it deletes
  destoryData();
} else {
  importData();
}
