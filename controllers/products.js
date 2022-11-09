const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { name } = req.query;
  const queryObject = req.query;

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  const products = await Product.find(queryObject);
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
