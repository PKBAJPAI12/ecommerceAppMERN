const express=require('express');
const router=express.Router();
const  {getAllProducts,getProductDetails,createProduct,updateProduct,deleteProduct}  = require('../controller/productController');
router.get('/products',getAllProducts);
router.post('/product/new',createProduct);
router.put('/product/:id',updateProduct);
router.delete('/product/:id',deleteProduct);
router.get('/product/:id',getProductDetails);
module.exports=router
