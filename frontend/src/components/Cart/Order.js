import React, { useState, useEffect } from "react";
import Footer from "../footer";
import Navbar from "../navbar";
import MetaData from "../MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
const Order = () => {
    const { cartItems,shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const navigate=useHistory();
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
    
      // Calculate GST
      const gst = (subtotal * 18) / 100;
    
      // Calculate Total
      const shippingCharge=(subtotal<500)?150:0;
      const total = subtotal + gst + shippingCharge; 
      const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharge,
          gst,
          total,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        navigate.push("/process/payment");
      };
  return (
    <>
      <MetaData title="Ecommerce-Order Confirmation" />
      <Navbar />
      <CheckoutSteps activeStep={1}/>
      <div style={{ marginTop: "1.5rem", marginLeft: "0rem", marginRight: "1.5rem", flexDirection: "column" }} className="section">
                <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
                    <h1 style={{ marginRight: "1rem", fontSize: "2.2rem", fontStyle: "italic", fontFamily: "cursive" }}>Order Confirmation </h1>
                    <img style={{ width: "3rem" }} src={require(`../../img/new images/swirly-scribbled-arrow.png`)} alt="" srcSet="" />
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "50%" }}>

<div className="card-body" style={{ margin: "auto", width: "85%", marginBottom: "1.5rem" }}>
    <h2 style={{ fontSize: "1.6rem" }}>Cart Products </h2>
    <div className="cart-body">
       {cartItems.length>0 &&
       <>
        <table style={{backgroundColor: "white", marginTop:"1.5rem", width:"100%"}}
            className="ordertable">
            <thead>
                <tr>
                    <th style={{fontSize: "1.3rem", padding: "0.8rem"}} scope="col">Product</th>
                    <th style={{fontSize: "1.3rem", padding: "0.8rem"}} scope="col">Product Name</th>
                    <th style={{fontSize: "1.3rem", padding: "0.8rem"}} scope="col">Product Price</th>
                    <th style={{fontSize: "1.3rem", padding: "0.8rem"}} scope="col">Quantity</th>
                    <th style={{fontSize: "1.3rem", padding: "0.8rem"}} scope="col">Total Price</th>
                </tr>
            </thead>
            {cartItems.map((item)=>(
                <tr style={{background: "linear-gradient(45deg,rgb(224, 197, 215),transparent)"}}>
                <td style={{display: "flex", justifyContent: "center"}}><img style={{width:"5rem", marginTop: "1rem"}} src={require(`../../img/${item.image}`)} srcSet=""/></td>
                <td style={{fontSize: "1.1rem",textAlign: "center"}}><Link to={`/product/${item.product}`}>{item.name}</Link></td>
                <td style={{fontSize: "1.1rem",textAlign: "center"}}>{item.price}</td>
                <td style={{fontSize: "1.1rem",textAlign: "center"}}>{item.quantity}</td>
<td style={{fontSize: "1.1rem", textAlign: "center"}}>{item.quantity*item.price}</td>
            </tr>
            ))
            }
           </table> 
           <div>
                <h3>Order Summary</h3>
                <p style={{fontSize: "1.3rem"}} colSpan="5" className="text-right font-weight-bold m-5">
                    Sub Total Price: RS.{subtotal}
                </p>                                  
                <p style={{fontSize: "1.3rem"}} colSpan="5" className="text-right font-weight-bold m-5">
                    GST: RS.{gst}
                </p>                
                <p style={{fontSize: "1.3rem"}} colSpan="5" className="text-right font-weight-bold m-5">
                    Delivery Charge: RS.{shippingCharge}
                </p>                               
                <p style={{fontSize: "1.3rem"}} colSpan="5" className="text-right font-weight-bold m-5">
                    Total Price: RS.{total}
                </p>
           </div>
        </>
        }
    </div>
</div>
{cartItems.length>0 &&
<div style={{width:"85%", margin:"3rem auto"}} className="formsectionbtn">
<input onClick={proceedToPayment} style={{width: "7rem", padding: "0.7rem"}} className="newsectionbtn" type="button" value="Proceed To Payment"/>
</div>
}
</div>         
      <div style={{ width: "40%"}}>
        <div
          className="addproductform"
          style={{
            borderTop: "0px solid black",
            borderLeft: "0px solid black",
            borderRight: "0px solid black",
            borderTopLeftRadius: "0rem",
            borderTopRightRadius: "0rem",
          }}
        >
          <img
            id="formimg"
            style={{ width: "3rem", padding: "2rem", boxSizing: "content-box" }}
            src="./img/hand (1).png"
            alt=""
            srcSet=""
          />
            <h2
              style={{
                fontSize: "1.5rem",
                marginLeft: "0.5rem",
                marginBottom: "1rem",
              }}
            >
             Shipping Details
            </h2>
            <div className="formrows">
              <div style={{ width: "90%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <HomeIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>Address</label>
                </div>

                <p
                  style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}>
                  {shippingInfo.address}
                </p>
              </div>
            </div>
            <div className="formrows">
              <div style={{ width: "90%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <PhoneIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>Phone Number</label>
                </div>
                <p
                  style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}
                >{shippingInfo.phoneNo}</p>
              </div>
            </div>
            <div className="formrows" style={{ display: "flex" }}>
              <div style={{ width: "40%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <PublicIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>Country</label>
                </div>
                <p
                style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}
              >{shippingInfo.country}
              </p>
              </div>
              <div style={{ width: "40%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <TransferWithinAStationIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>State</label>
                </div>
                <p
                style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}
              >{shippingInfo.state}
              </p>
              </div>
            </div>
            <div className="formrows" style={{ display: "flex" }}>
            <div style={{ width: "40%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <LocationCityIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>City</label>
                </div>
                <p
                  style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}
                >{shippingInfo.state}</p>
              </div>
            <div style={{ width: "40%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <PinDropIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>Pin Code</label>
                </div>
                <p
                  style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}
                >{shippingInfo.pinCode}</p>
              </div>
            </div>
          
        </div>
      </div>
      </div>
</div>
      <Footer/>
    </>
  )
}

export default Order