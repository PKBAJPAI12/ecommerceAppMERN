import "./App.css";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { loadUser } from './actions/userAction';
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
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
import { BASE_URL } from "./helper";

function App() {
  const { isAuthenticated } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const token = localStorage.getItem('token');
    if (token) {
      const config = {
        headers: { 'Authorization': `Bearer ${token}` },
      };
      const { data } = await axios.get(`${BASE_URL}/api/v1/stripeapikey`, config);
      setStripeApiKey(data.stripeApiKey);
    }
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route path="/product/:id" component={ProductDetails} />
        {!isAuthenticated && <Route path="/signup" component={Signup} />}
        <Route path="/login" component={Login} />
        <Route path="/account" component={Profile} />
        {isAuthenticated && <Route path="/update/profile" component={UpdateProfile} />}
        {isAuthenticated && <Route path="/update/password" component={UpdatePassword} />}
        <Route path="/forget/password" component={ForgetPassword} />
        <Route path="/password/reset/:token" component={ResetPassword} />
        <Route path="/cart" component={Cart} />
        {isAuthenticated && <Route path="/shipping" component={Shipping} />}
        {isAuthenticated && <Route path="/order/confirm" component={Order} />}
        {isAuthenticated && stripeApiKey && (
          <Route path="/process/payment" component={() => (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          )} />
        )}
      </Switch>
    </Router>
  );
}

export default App;
