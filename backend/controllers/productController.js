import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

//@desc   Create Product
//@route  POST /api/products/
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // create boiler plate for new product
  const product = new Product({
    name: 'Sample Name',
    // priceFile: 0,
    priceProduct: 0,
    user: req.user._id,
    image: '/image/sample.jpg',
    category: 'Sample category',
    // fileLink: 'benchy.zip',
    productionAmount: 5,
    numReviews: 0,
    description: 'Sample description',
  });

  // create the product and send it
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc   Fetch all products
//@route  GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  // control how many items per page
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  // this is how to get the question mark
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc   Fetch single product
//@route  GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  // grab product by id
  const product = await Product.findById(req.params.id);

  // check product and send data
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc   update product
//@route  PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  // grab data by id
  const product = await Product.findById(req.params.id);

  // check product and change the data
  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    // product.priceFile = req.body.priceFile || product.priceFile;
    product.priceProduct = req.body.priceProduct || product.priceProduct;
    product.productionAmount =
      req.body.productionAmount || product.productionAmount;

    // update the data and send it back
    const updateProduct = await product.save();

    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc   delete a product
//@route  DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  // grab the product by id
  const product = await Product.findById(req.params.id);

  // check product and remove it
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product does not exist');
  }
});

//@desc   create new review
//@route  Post /api/products/:id/reviews
//@access Private
const createProductReview = asyncHandler(async (req, res) => {
  // grab the review from req.
  const { rating, comment } = req.body;

  // find the product by id
  const product = await Product.findById(req.params.id);

  // check product and review
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('User already review');
    }

    // create new review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // add review and update # of reviews and rating
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    // confirm and send the data
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc   get top rated product
//@route  GET /api/products/top
//@access Public
const getTopProducts = asyncHandler(async (req, res) => {
  // grab data by sorting the reviews top 3 best
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

//@desc   delete a review
//@route  DELETE /api/products/:id/reviews
//@access Private/Admin

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
};
