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
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const { isAuthenticatedUser, authorisedRole} = require("../middleware/auth");
//router.get('/products',getAllProducts);
router.post("/register", registerUser);
router.post("/loginUser", loginUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logout", logoutUser);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser, updateProfile);
//admin 
router.get("/admin/allUsers", isAuthenticatedUser,authorisedRole("admin"),getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorisedRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorisedRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorisedRole("admin"), deleteUser);
//router.put('/product/:i  d',updateProduct);
//router.delete('/product/:id',deleteProduct);
//router.get('/product/:id',getProductDetails);
module.exports = router;
