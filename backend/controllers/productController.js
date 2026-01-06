import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Add new product
// @route   POST /api/v1/products

const addProduct = asyncHandler(async (req, res) => {
  try {
    console.log('Received request fields:', req.fields); // Debug log

    const { name, description, price, category, quantity, brand, countInStock, image } = req.fields || req.body;

    // Validation
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!brand) return res.status(400).json({ message: "Brand is required" });
    if (!description) return res.status(400).json({ message: "Description is required" });
    if (!price) return res.status(400).json({ message: "Price is required" });
    if (!category || category === 'undefined') return res.status(400).json({ message: "Valid category ID is required" });
    if (!quantity) return res.status(400).json({ message: "Quantity is required" });

    // Convert string values to appropriate types
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      quantity: Number(quantity),
      brand,
      countInStock: Number(countInStock) || Number(quantity),
      image: image || "/images/sample.jpg"
    };

    console.log('Creating product with data:', productData);

    const product = new Product(productData);

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(400).json({ message: error.message || "Failed to create product" });
  }
});

// @desc    Update product
// @route   PUT /api/v1/products/:id

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    console.log('Received fields:', req.fields); // Debug log

    const { name, description, price, category, quantity, brand, image } = req.fields;

    // Prepare update object
    const updateData = {};
    
    // Only include fields that are provided and not undefined
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = Number(price);
    if (category && category !== 'undefined') updateData.category = category;
    if (quantity) {
      updateData.quantity = Number(quantity);
      updateData.countInStock = Number(quantity);
    }
    if (brand) updateData.brand = brand;
    if (image) updateData.image = image;

    console.log('Update data:', updateData); // Debug log

    // Update the product using findByIdAndUpdate
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, try again" });
  }
});

// @desc    Get 6 products per page
// @route   GET /api/v1/products
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// @desc    Get a single product
// @route   GET /api/v1/products/:id
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

// @desc    Get all product
// @route   GET /api/v1/products/allproducts
const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// @desc    Add a review
// @route   POST /api/v1/products/:id/reviews
const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// @desc    Fetch top products
// @route   GET /api/v1/products/top
const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// @desc    Fetch new products
// @route   GET /api/v1/products/new
const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// @desc    Filtered products
// @route   POST /api/v1/products/filtered-products
const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});
export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
