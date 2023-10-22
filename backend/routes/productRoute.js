const express=require('express');
const router=express.Router();
const  {getAllProducts,getProductDetails,createProduct,updateProduct,deleteProduct}  = require('../controller/productController');
const { isAuthenticatedUser,authorisedRole } = require('../middleware/auth');
router.get('/products',getAllProducts);
router.post('/product/new',isAuthenticatedUser,authorisedRole("admin"),createProduct);
router.put('/product/:id',isAuthenticatedUser,authorisedRole("admin"),updateProduct);
router.delete('/product/:id',isAuthenticatedUser,authorisedRole("admin"),deleteProduct);
router.get('/product/:id',getProductDetails);
module.exports=router
