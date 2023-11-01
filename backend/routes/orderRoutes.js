const express = require('express');
const router = express.Router();
const {
    newOrder,getSingleOrder,myOrders,getAllOrders,updateOrder,deleteOrder
} = require("../controller/orderController");
const { isAuthenticatedUser, authorisedRole} = require("../middleware/auth");
router.post('/order/new',isAuthenticatedUser,newOrder);
router.get('/order/:id',isAuthenticatedUser,getSingleOrder);
router.post('/orders/me',isAuthenticatedUser,myOrders);
router.get('/admin/orders',isAuthenticatedUser,authorisedRole("admin"),getAllOrders);
router.put('/admin/order/:id',isAuthenticatedUser,authorisedRole("admin"),updateOrder);
router.delete('/admin/order/:id',isAuthenticatedUser,authorisedRole("admin"),deleteOrder);
module.exports=router