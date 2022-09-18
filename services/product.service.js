const Product = require("../models/Product");

exports.getProductsService = async (limit) => {
  const products = await Product.find({}).limit(+limit);
  return products;
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};
exports.updateProductByIdService = async (productId, data) => {
  /* const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  ); */

  const result = await Product.updateOne(
    { _id: productId },
    { $inc: data },
    { runValidators: true }
  );

  /* const product = await Product.findById(productId);
  const result = product.set(data).save(); */
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  /*  const result = await Product.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  }); */

  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  console.log(result);
  return result;
};

exports.deleteProductById = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
