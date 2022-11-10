const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('name price');
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { name, sort, fields } = req.query;
  const queryObject = req.query;

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortLlist = sort.split(',').join(' ');
    result = result.sort(sortLlist);
  } else {
    result = result.sort('createdAt');
  }

  // fields
  if (fields) {
    const fieldsLlist = fields.split(',').join(' ');
    result = result.select(fieldsLlist);
  }

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
