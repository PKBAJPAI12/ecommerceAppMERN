import React, { useState, useEffect,useRef  } from "react";
import Footer from "../footer";
import Navbar from "../navbar";
import MetaData from "../MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import "./Payment.css";
import { loadStripe } from '@stripe/stripe-js';
//import { createOrder, clearErrors } from "../../actions/orderActions";
import {
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Payment = () => {
    const [cardNumber,setCardNumber]=useState("################");
    const [cardHolderName,setCardHolderName]=useState("Card Holder Name");
    const [cardExpiry,setCardExpiry]=useState("mm/yy");
    const [cardCvv,setCardCvv]=useState("");
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const payBtn = useRef(null);
const navigate=useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  //const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    ammount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardNumber,
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
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

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
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  /*useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);*/
        const handleCardNumberInput = (e) => {
            setCardNumber(e.target.value);
        };
        
        const handleCardHolderInput = (e) => {
            setCardHolderName(e.target.value);
        };
    
        const handleExpiryInput = (e) => {
            setCardExpiry(e.target.value);
        };
    
        const handleCvvMouseEnter = () => {
          document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
          document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
        };
    
        const handleCvvMouseLeave = () => {
          document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
          document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
        };
    
        const handleCvvInput = (e) => {
            setCardCvv(e.target.value)
        };
    
    
  return (
    <>
     <MetaData title="Ecommerce-Payment" />
      <Navbar />
      <CheckoutSteps activeStep={2}/>
      <div style={{top:"5rem"}} className="debitcardsection">
      <div className="debitcard">
        <div className="front">
            <div className="image">
                <img src={require(`../../img/chip.png`)} alt=""/>
                <img src={require(`../../img/maestro.png`)} alt=""/>
            </div>
            <div className="card-number-box">{cardNumber}</div>
            <div className="flexbox">
                <div className="box">
                    <span>card holder</span>
                    <div className="card-holder-name">{cardHolderName}</div>
                </div>
                <div className="box">
                    <span>expires</span>
                    <div className="expiration">
                        <span className="expiry-date">{cardExpiry}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="back">
            <div className="stripe"></div>
            <div className="box">
                <span>cvv</span>
                <div className="cvv-box">{cardCvv}</div>
                <img src={require(`../../img/maestro.png`)} alt=""/>
            </div>
        </div>
      </div>
      <div style={{height: "65%", justifyContent: "center", position: "initial", width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "-2rem", paddingtop: "10rem"}}
         className="formsection">
        <h2 style={{marginTop:"5.5rem"}}>Payment of Your Order</h2>
        <img id="formimg" style={{width: "3rem", padding:"2rem", boxSizing: "content-box"}} src={require(`../../img/hand (1).png`)} alt=""
              srcset=""/>
        <form style={{width: "80%"}} onSubmit={submitHandler} >
            <div className="formrows">
                <div style={{width: "40%", margin: "auto"}} className="formcol">
                    <div className="formlevel">
                        <img style={{width: "2rem", marginRight:"1rem"}} src={require(`../../img/pin-number.png`)} alt=""  srcset=""/>
                        <label>Card Number</label>
                    </div>
                    <input onInput={handleCardNumberInput} style={{padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}}
                           type="text" className="form-control card-number-input" placeholder="Enter Card Number"/>
                </div>
                <div style={{width: "40%", margin: "auto"}} className="formcol">
                    <div className="formlevel">
                        <img style={{width: "2rem", marginRight:"1rem"}} src={require(`../../img/user (2).png`)} alt=""  srcset=""/>
                        <label>Card Holder Name</label>
                    </div>
                    <input onInput={handleCardHolderInput} style={{padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}}
                           type="text" className="form-control card-holder-input" placeholder="Enter Card Holder Name"/>
                </div>
            </div>
            <div className="formrows">
                <div style={{width: "40%", margin: "auto"}} className="formcol">
                    <div className="formlevel">
                        <img style={{width: "2rem", marginRight:"1rem"}} src={require(`../../img/cvv.png`)} alt=""  srcset=""/>
                        <label>CVV</label>
                    </div>
                    <input onMouseEnter={handleCvvMouseEnter} onMouseLeave={handleCvvMouseLeave} onInput={handleCvvInput} style={{padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}}
                           type="text" className="form-control cvv-input" placeholder="Enter CVV Code"/>
                </div>
                <div style={{width: "40%", margin: "auto"}} className="formcol">
                    <div className="formlevel">
                        <img style={{width: "2rem", marginRight:"1rem"}} src={require(`../../img/calendar.png`)} alt=""  srcset=""/>
                        <label>Card Expiry Date</label>
                    </div>
                    <input onInput={handleExpiryInput} style={{padding:" 0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}}
                           type="text" className="form-control expiry-input" placeholder="Enter Expiry Date"/>
                </div>
            </div>
            <div className="formrows" style={{marginBottom: "1rem"}}>
                <div style={{width: "40%", margin: "auto"}} className="formcol">
                    <div className="formlevel">
                        <img style={{width: "2rem", marginRight:"1rem"}} src={require(`../../img/account.png`)} alt=""  srcset=""/>
                        <label>Due Ammount</label>
                    </div>
                    <input style={{color:"white", padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}}
                           type="text" className="form-control" placeholder="Enter <%=bill.getDues()%>" name="due"/>
                </div>
                <div style={{width: "40%", margin: "auto"}} className="formcol">
                    <div className="formlevel">
                        <img style={{width: "2rem", marginRight:"1rem"}} src={require(`../../img/pay (1).png`)} alt=""  srcset=""/>
                        <label>Pay Ammount</label>
                    </div>
                    <input style={{color:"white", padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}}
                           type="text" className="form-control" placeholder="Enter <%=bill.getAmount()%>" name="billA"/>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center"}} className="formsectionbtn">
            
              <input style={{ padding: "0.9rem"}} className="newsectionbtn" type="submit" value="Payment Confirm"/>
            
            </div>
        </form>
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default Payment