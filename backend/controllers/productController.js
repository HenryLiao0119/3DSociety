import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

//@desc   Fetch all products
//@route  GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  // const pageSize = 2;
  // const page = Number(req.query.pageNumber) || 1;
  // this is how to get the question mark
  // const keyword = req.query.keyword
  //   ? {
  //       name: {
  //         $regex: req.query.keyword,
  //         $options: 'i',
  //       },
  //     }
  //   : {};
  // const count = await Product.countDocuments({ ...keyword });
  // const products = await Product.find({ ...keyword })
  //   .limit(pageSize)
  //   .skip(pageSize * (page - 1));
  // res.json({ products, page, pages: Math.ceil(count / pageSize) });

  const products = await Product.find({});

  res.json(products);
});

//@desc   Fetch single product
//@route  GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc   delete a product
//@route  DELETE /api/products/:id
//@access Private/Admin

//@desc   update product
//@route  PUT /api/products/:id
//@access Private/Admin

//@desc   Create Product
//@route  POST /api/products/
//@access Private/Admin

//@desc   create new review
//@route  Post /api/products/:id/reviews
//@access Private

export { getProducts, getProductById };
