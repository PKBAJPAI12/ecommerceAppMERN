import React, { useState, useEffect } from "react";
import Footer from '../footer'
import Navbar from '../navbar'
import MetaData from '../MetaData'
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartActions";
import { Link, useHistory } from "react-router-dom";
const Cart = () => {
    const dispatch = useDispatch();
    const navigate=useHistory();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkoutHandler = () => {
    if(isAuthenticated){
        navigate.push("/shipping");
    }else{
        navigate.push("/login");
    }
  };
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // Calculate GST
  const gst = (subtotal * 18) / 100;

  // Calculate Total
  const shippingCharge=(subtotal<500)?150:0;
  const total = subtotal + gst + shippingCharge; 
    return (
        <>
            <MetaData title="Ecommerce-My Cart" />
            <Navbar />
            <div style={{ marginTop: "1.5rem", marginLeft: "0rem", marginRight: "1.5rem", flexDirection: "column" }} className="section">
                <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
                    <h1 style={{ marginRight: "1rem", fontSize: "2.2rem", fontStyle: "italic", fontFamily: "cursive" }}>My Cart </h1>
                    <img style={{ width: "3rem" }} src={require(`../../img/new images/swirly-scribbled-arrow.png`)} alt="" srcSet="" />
                </div>
                    <div style={{ width: "80%", margin:"auto" }}>

                        <div className="card-body" style={{ margin: "auto", width: "85%", marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.6rem" }}>Cart Products </h2>
                            <div className="cart-body">
                               {(cartItems.length>0)?
                                <>
                                <table style={{backgroundColor: "white", marginTop:"1.5rem", width:"100%"}}
                                    className="ordertable">
                                    <thead>
                                        <tr>
                                            <th style={{fontSize: "1.3rem", padding: "0.8rem"}} scope="col">Product</th>
                                            <th style={{fontSize: "1.3rem", padding: "0.8rem"}} scope="col">Product Name</th>
                                            <th style={{fontSize: "1.3rem", padding: "0.8rem"}} scope="col">Product Price</th>
                                            <th style={{fontSize: "1.3rem", padding: "0.8rem"}} scope="col">Quantity</th>
                                            <th style={{fontSize: "1.3rem", padding: "0.8rem"}} scope="col">Price</th>
                                            <th style={{fontSize: "1.3rem", padding: "0.8rem"}} scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    {cartItems.map((item)=>(
                                        <tr style={{background: "linear-gradient(45deg,rgb(224, 197, 215),transparent)"}}>
                                        <td style={{display: "flex", justifyContent: "center"}}><img style={{width:"5rem", marginTop: "1rem"}} src={require(`../../img/${item.image}`)} srcSet=""/></td>
                                        <td style={{fontSize: "1.1rem",textAlign: "center"}}><Link to={`/product/${item.product}`}>{item.name}</Link></td>
                                        <td style={{fontSize: "1.1rem",textAlign: "center"}}>{item.price}</td>
                                        <td style={{fontSize: "1.1rem",textAlign: "center"}}><button onClick={() =>
                        decreaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }>-</button><span>{item.quantity}</span><button 
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }>+</button></td>
                      <td style={{fontSize: "1.1rem", textAlign: "center"}}>{item.quantity*item.price}</td>
                                        <td style={{display: "flex", justifyContent: "center", paddingBottom: "1.5rem"}}><button style={{padding: "0.5rem", borderRadius: "0.7rem", color: "blue", background: "linear-gradient(45deg,red,white)"}} onClick={() => deleteCartItems(item.product)} class="">Remove</button></td>
                                    </tr>
                                    ))
                                    }
                                   </table> 
                                   <div>
                                        <p style={{fontSize: "1.3rem"}} colspan="5" class="text-right font-weight-bold m-5">
                                            Sub Total Price: RS.{subtotal}
                                        </p>                                  
                                        <p style={{fontSize: "1.3rem"}} colspan="5" class="text-right font-weight-bold m-5">
                                            GST: RS.{gst}
                                        </p>                
                                        <p style={{fontSize: "1.3rem"}} colspan="5" class="text-right font-weight-bold m-5">
                                            Delivery Charge: RS.{shippingCharge}
                                        </p>                               
                                        <p style={{fontSize: "1.3rem"}} colspan="5" class="text-right font-weight-bold m-5">
                                            Total Price: RS.{total}
                                        </p>
                                   </div>
                                </>
                                :<>
                                <h3>Cart does not have any items</h3>
                                <Link to="/products">View Products</Link>
                                </>
                                }
                            </div>
                        </div>
                        {cartItems.length>0 &&
                        <div style={{width:"85%", margin:"3rem auto"}} className="formsectionbtn">
                        <input style={{width: "7rem", padding: "0.7rem"}} onClick={checkoutHandler} className="newsectionbtn" type="button" value="Checkout"/>
                        </div>
                        }
                    </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart