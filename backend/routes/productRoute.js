const express=require('express');
const router=express.Router();
const  {getAllProducts,createProduct}  = require('../controller/productController');
router.get('/products',getAllProducts);
router.post('/product/new',createProduct);
module.exports=router
