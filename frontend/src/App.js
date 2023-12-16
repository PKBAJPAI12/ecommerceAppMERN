import "./App.css";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import store from "./store";
import {loadUser} from './actions/userAction';
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile"
import UpdatePassword from "./components/User/UpdatePassword";
import ForgetPassword from "./components/User/ForgetPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";

function App() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  useEffect(()=>{
    store.dispatch(loadUser());
  },[])
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {!isAuthenticated &&
        <Route path="/signup" element={<Signup />} />
        }
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/update/profile" element={<UpdateProfile />} />
        <Route path="/update/password" element={<UpdatePassword />} />
        <Route path="/forget/password" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        
      </Routes>
    </Router>
  );
}

export default App;