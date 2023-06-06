const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// create new product => /api/v1/admin/product/new
exports.newProduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    let product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
// update product  => api/v1/admin/product/:id

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// get all product => api/v1/products
exports.getProducts = async (req, res, next) => {
  try {
    // return next(new ErrorHandler("my new error", 400));
    const resPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resPerPage);

    let products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      productsCount,
      count: products.length,
      products,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// get single product by id => api/v1/product/:id

exports.getSingleProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// delete single product by id => api/v1/product/:id

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    await product.deleteOne({ _id: req.params.id }); // .remove() is a callback over Product.findById(id) but it is not working so i use Product.deleteOne({filter});
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// create/update review => /api/v1/review

exports.createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (!isReviewed) {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    } else {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.rating = rating;
          review.comment = comment;
        }
      });
    }

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

// Get Product Reviews => /api/v1/reviews

exports.getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);

    return res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

// Delete Product Reviews => /api/v1/reviews
exports.getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);

    const reviews = product.reviews.filter((review) => review);
    return res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

// Delete Product Review => /api/v1/reviews
exports.deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== req.query.id.toString()
    );

    const numOfReviews = reviews.length;
    const ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(new ErrorHandler(err, 400));
  }
};
