
const express = require('express');
const router = express.Router();

const {upload} = require('../controllers/auth.js')

const {createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct} = require('../controllers/product.js')


router.post('/create-product', upload.single('photo'), createProduct);
router.get('/admin-products', getProducts);
router.get('/single-product/:id', getSingleProduct);
router.put('/update-product/:id', upload.single('photo'), updateProduct);
router.delete('/delete-product/:id', deleteProduct);

module.exports = router;