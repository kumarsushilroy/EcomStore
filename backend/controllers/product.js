const productSchema = require("../models/product.js");
const cloudinary = require("../helper/helper.js");

const createProduct = async (req, res) => {
  if (req.file) {
    var cloudImg = await cloudinary.uploader.upload(req.file.path);
    console.log("CLOUDINARY== ", cloudImg);
  }

  try {
    const { name, price, category} = req.body;
    if (!name || !price || !category ) {
      return res.status(400).json({
        success: false,
        message: "all fields require !",
      });
    }
    const createProduct = new productSchema({
      name,
      price,
      category,
      photo: cloudImg.secure_url,
    });
    await createProduct.save();
    return res.status(200).json({
      success: true,
      message: "product created successfully",
      createdProduct: createProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong !",
      error: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  
  try {
    const {search,category} = req.query ;
    const query ={};
    if(search){
      query.name = {$regex:search, $options:'i'}
    }
    if(category){
      query.category = category
    }

    const product = await productSchema.find(query)

    return res.status(200).json({
      success: true,
      product
      
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "something went wrong !",
      error: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const singleProd = await productSchema.findById(id);
    return res.status(200).json({
      success: true,
      singleProd,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "something went wrong !",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    if(req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      updatedData.photo = upload.secure_url;
    }
    const id = req.params.id;
    const updateProd = await productSchema.findByIdAndUpdate(
      { _id: id },
      updatedData,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "product updated successfully !",
      updateProd,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "something went wrong !",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteproduct = await productSchema.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "product deleted successfully",
      deleteproduct,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "something went wrong !",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
