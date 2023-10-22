const express=require('express');
const router=express.Router();
const  {registerUser, loginUser,logoutUser, forgotPassword,resetPassword}  = require('../controller/userController');
//router.get('/products',getAllProducts);
router.post('/register',registerUser);
router.post('/loginUser',loginUser);
router.post('/password/forgot',forgotPassword);
router.put('/password/reset/:token',resetPassword);
router.get('/logout',logoutUser);
//router.put('/product/:i  d',updateProduct);
//router.delete('/product/:id',deleteProduct);
//router.get('/product/:id',getProductDetails);
module.exports=router
