const {
  getProductsService,
  createProductService,
} = require("../services/product.service");

exports.getProducts = async (req, res, next) => {
  try {
    // const product = await Product.find({}).select({ name: 1 });
    /* const product = await Product.where("name")
        .equals(/\w/)
        .where("quantity")
        .gt(100)
        .limit(2); */

    const products = await getProductsService(req.query.limit);

    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

module.exports.createProduct = async (req, res, next) => {
  try {
    //save or create
    const result = await createProductService(req.body);
    result.logger();
    res.status(200).json({
      status: "success",
      message: "Data inserted successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};
