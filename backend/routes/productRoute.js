const express=require('express');
const router=express.Router();
const  {getAllProducts,getProductDetails,createProduct,updateProduct,deleteProduct}  = require('../controller/productController');
const { isAuthenticatedUser } = require('../middleware/auth');
router.get('/products',isAuthenticatedUser,getAllProducts);
router.post('/product/new',createProduct);
router.put('/product/:id',updateProduct);
router.delete('/product/:id',deleteProduct);
router.get('/product/:id',getProductDetails);
module.exports=router
