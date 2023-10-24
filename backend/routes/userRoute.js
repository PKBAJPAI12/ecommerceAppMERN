const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
} = require("../controller/userController");
const { isAuthenticatedUser, authorisedRole} = require("../middleware/auth");
//router.get('/products',getAllProducts);
router.post("/register", registerUser);
router.post("/loginUser", loginUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logout", logoutUser);
router.get("/profile", isAuthenticatedUser, getUserDetails);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/profile/update", isAuthenticatedUser, updateProfile);
//admin 
router.get("/admin/allUsers", isAuthenticatedUser,authorisedRole("admin"),getAllUsers);
//router.put('/product/:i  d',updateProduct);
//router.delete('/product/:id',deleteProduct);
//router.get('/product/:id',getProductDetails);
module.exports = router;
