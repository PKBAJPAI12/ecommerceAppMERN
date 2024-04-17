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
import Shipping from "./components/Cart/Shipping";
import Order from "./components/Cart/Order";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {BASE_URL} from "./helper";
//const stripePromise = loadStripe("pk_test_51OT498SEMCO9ZOkC07dkablECWlvtr3fFhuW5cygOipXndxvmCknxxRVvBIxHykcqzRjLVfW9MttaqT10aQzu2M100fUuKwJAP");
function App() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const [stripeApiKey, setStripeApiKey] =useState("");
  async function getStripeApiKey(){
    const token = localStorage.getItem('token');
    console.log(`tok ${token}`)
    if(token) {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
    const {data}=await axios.get(`${BASE_URL}/api/v1/stripeapikey`,config);
    console.log(`data ${data.stripeApiKey}`);
    setStripeApiKey(() => loadStripe(data.stripeApiKey));
    }
  }
  useEffect(()=>{
    store.dispatch(loadUser());
    getStripeApiKey();
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
        {isAuthenticated &&
        <Route path="/update/profile" element={<UpdateProfile />} />
        }
        {isAuthenticated &&
        <Route path="/update/password" element={<UpdatePassword />} />
        }
        <Route path="/forget/password" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        {isAuthenticated &&
        <Route path="/shipping" element={<Shipping/>}/>
        }
        {isAuthenticated &&
        <Route path="/order/confirm" element={<Order/>}/>
        }
        {isAuthenticated && stripeApiKey &&
        <Route
          path="/process/payment"
          element={
            <Elements stripe={stripeApiKey}>
              <Payment />
            </Elements>
          }
        />
        }
      </Routes>
    </Router>
  );
}

export default App;