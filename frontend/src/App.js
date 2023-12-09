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
      </Routes>
    </Router>
  );
}

export default App;