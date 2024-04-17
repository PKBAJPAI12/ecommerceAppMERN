import React, { useState, useEffect,useRef  } from "react";
import Footer from "../footer";
import Navbar from "../navbar";
import MetaData from "../MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import "./Payment.css";
import {BASE_URL} from "../../helper"
//import { createOrder, clearErrors } from "../../actions/orderActions";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const [cardHolderName,setCardHolderName]=useState("Card Holder Name");
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();
  //console.log(`stripeApiKey ${stripeApiKey}`);
  //const stripe = loadStripe(stripeApiKey);
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
const navigate=useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  //const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.gst,
    shippingPrice: orderInfo.shippingCharge,
    totalPrice: orderInfo.total,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
   console.log("submit");
    payBtn.current.disabled = true;

    try {   

      const token = localStorage.getItem('token');
      if(token) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      };
      const { data }  = await axios.post(
        `${BASE_URL}/api/v1/payment/process`,
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      console.log(`client_secret ${client_secret}`)
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        }
      });      
      if (result.error) {
        payBtn.current.disabled = false;
        console.log(result.error.message);
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

         // dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
      }
      else{
        alert.error("You are not Authenticate User");
        navigate("/login");
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(`err ${error.response.data.message}`)

      alert.error(error.response.data.message);
    }
  };

  /* useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);*/
        const handleCardHolderInput = (e) => {
            setCardHolderName(e.target.value);
        };
    
    
    
  return (
    <>
     <MetaData title="Ecommerce-Payment" />
      <Navbar />
      <CheckoutSteps activeStep={2}/>
      <div style={{top:"5rem"}} className="debitcardsection">
      <div style={{height: "65%", justifyContent: "center", position: "initial", width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "-2rem", paddingtop: "10rem"}}
         className="formsection">
        <h2 style={{marginTop:"5.5rem"}}>Payment of Your Order</h2>
        <img id="formimg" style={{width: "3rem", padding:"2rem", boxSizing: "content-box"}} src={require(`../../img/hand (1).png`)} alt=""
              srcset=""/>

        <form style={{width: "80%"}} onSubmit={(e) => submitHandler(e)} >
            <div className="formrows">
                <div style={{width: "40%", margin: "auto"}} className="formcol">
                    <div className="formlevel">
                        <img style={{width: "2rem", marginRight:"1rem"}} src={require(`../../img/pin-number.png`)} alt=""  srcset=""/>
                        <label>Card Number</label>
                    </div>
                    <CardNumberElement className="paymentInput" />
                </div>
                <div style={{width: "40%", margin: "auto"}} className="formcol">
                    <div className="formlevel">
                        <img style={{width: "2rem", marginRight:"1rem"}} src={require(`../../img/user (2).png`)} alt=""  srcset=""/>
                        <label>Card Holder Name</label>
                    </div>
                    <input onInput={handleCardHolderInput} type="text" className="form-control card-holder-input paymentInput" placeholder="Enter Card Holder Name"/>
                </div>
            </div>
            <div className="formrows">
                <div style={{width: "40%", margin: "auto"}} className="formcol">
                    <div className="formlevel">
                        <img style={{width: "2rem", marginRight:"1rem"}} src={require(`../../img/cvv.png`)} alt=""  srcset=""/>
                        <label>CVV</label>
                    </div>
                    <CardCvcElement className="paymentInput" />
                </div>
                <div style={{width: "40%", margin: "auto"}} className="formcol">
                    <div className="formlevel">
                        <img style={{width: "2rem", marginRight:"1rem"}} src={require(`../../img/calendar.png`)} alt=""  srcset=""/>
                        <label>Card Expiry Date</label>
                    </div>
                    <CardExpiryElement className="paymentInput" />
                </div>
    </div>
            <div style={{display: "flex", justifyContent: "center"}} className="formsectionbtn">
            
              <input style={{ padding: "0.9rem"}} className="newsectionbtn" type="submit" value={`Pay - ₹${orderInfo && orderInfo.total}`} ref={payBtn}/>

            </div>
        </form>
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default Payment