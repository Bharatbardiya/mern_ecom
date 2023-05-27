const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/product.json");

const Product = require("../models/product");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProduct = async () => {
  try {
    await Product.deleteMany();
    console.log("product deleted");

    await Product.insertMany(products);
    console.log("product inserted successfully");

    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedProduct();
