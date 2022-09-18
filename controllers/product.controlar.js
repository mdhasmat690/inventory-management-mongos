const { isValidObjectId } = require("mongoose");
const Product = require("../models/Product");
const {
  getProductsService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  updateProductByIdService,
  deleteProductById,
  bulkDeleteProductService,
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

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);
    res.status(200).json({
      status: "success",
      message: "successfully data updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't not updated data",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully data updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't not updated data",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    /* if (isValidObjectId(id)) {
      console.log("lkad;alksjdffaskjfd");
    } */
    const result = await deleteProductById(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "could not delete the product",
      });
    }

    res.status(200).json({
      status: "success",
      message: "successfully data Deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't not delete data",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);
    res.status(200).json({
      status: "success",
      message: "successfully deleted the given product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't not updated data",
      error: error.message,
    });
  }
};
