const express=require('express');
const router=express.Router();
const  {registerUser, loginUser}  = require('../controller/userController');
//router.get('/products',getAllProducts);
router.post('/register',registerUser);
router.post('/loginUser',loginUser);
//router.put('/product/:i  d',updateProduct);
//router.delete('/product/:id',deleteProduct);
//router.get('/product/:id',getProductDetails);
module.exports=router
