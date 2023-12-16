import React, { useState, useEffect } from "react";
import Footer from '../footer'
import Navbar from '../navbar'
import MetaData from '../MetaData'
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";
const Cart = () => {
    const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    /*if (stock <= quantity) {
      return;
    }*/
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    /*if (1 >= quantity) {
      return;
    }*/
    dispatch(addItemsToCart(id, newQty));
  };
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
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
                    <img style={{ width: "3rem" }} src="img/swirly-scribbled-arrow.png" alt="" srcSet="" />
                </div>

                <div style={{ display: "flex", width: "100%" }}>

                    <div style={{ width: "80%", margin:"auto" }}>

                        <div className="card-body" style={{ margin: "auto", width: "85%", marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.6rem" }}>Cart Products </h2>
                            <div className="cart-body">

                                {cartItems &&
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
                                    <tr>
                                        <td style={{fontSize: "1.3rem"}} colspan="5" class="text-right font-weight-bold m-5">
                                            Sub Total Price: RS.{subtotal}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{fontSize: "1.3rem"}} colspan="5" class="text-right font-weight-bold m-5">
                                            GST: RS.{gst}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{fontSize: "1.3rem"}} colspan="5" class="text-right font-weight-bold m-5">
                                            Delivery Charge: RS.{shippingCharge}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{fontSize: "1.3rem"}} colspan="5" class="text-right font-weight-bold m-5">
                                            Total Price: RS.{total}
                                        </td>
                                    </tr>
                                </table>}
                                {!cartItems &&
                                <h3>Cart does not have any items</h3>
                                }
                            </div>


                        </div>
                        <div>
                            {/*form details*/}
                            <div className="">
                                <div className="getOrderData">

                                    {/*product details*/}

                                </div>
                            </div>
                        </div>

                    </div>
                    {/*<div style={{width:"35%"}}>

            <div className="addproductform" style={{borderTop:"0px solid black",
                borderLeft: "0px solid black",
                borderRight: "0px solid black",
                borderTopLeftRadius: "0rem",
                borderTopRightRadius: "0rem"}}>

                <img id="formimg" style={{width: "3rem", padding:"2rem", boxSizing: "content-box"}} src="./img/hand (1).png" alt="" srcSet=""/>
                {/*message*/}
                    {/*<form style={{width: "85%"}}>
                    <h2 style={{fontSize: "1.5rem", marginLeft:"0.5rem", marginBottom:"1rem"}}>Personal Details</h2>

                    <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} type="hidden" name="addid" value={"<%=add.getAddressId()%>"} className="form-control" placeholder="Enter First Name"/>

                    <div className="formrows" >
                        <div style={{width: "90%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/product (2).png" alt="" srcSet=""/>
                                <label>Name</label>
                            </div>

                            <input style={{color:"black", padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} name="name" value={"<%=add.getFirstName()+add.getLastName()%>"} type="text" className="form-control" placeholder="Enter First Name"/>
                        </div>

                    </div>
                    <div className="formrows">

                        <div style={{width: "90%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/add (1).png" alt="" srcSet=""/>
                                <label>Email Address</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} value="<%=add.getUserShippingEmail()%>" name="email_address" type="email" className="form-control" placeholder="Enter Email"/>

                        </div>

                    </div>
                    <div className="formrows">

                        <div style={{width: "90%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/package.png" alt="" srcSet=""/>
                                <label>Phone Number</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} value="<%=add.getUserPhone()%>" name="phone_no" type="number" className="form-control" placeholder="Enter Phone Number"/>
                        </div>

                    </div>
                    <h2 style={{fontSize: "1.5rem", marginLeft:"0.5rem", marginBottom:"1rem", marginTop: "2rem"}}>Address Details</h2>
                    <div className="formrows">
                        <div style={{width: "90%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/product (2).png" alt="" srcSet=""/>
                                <label>Street Address</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} name="street_address" value="<%=add.getAddress()%>" type="text" className="form-control" placeholder="Enter Address"/>
                        </div>
                    </div>
                    <div className="formrows" style={{display: "flex"}}>

                        <div style={{width: "30%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/package.png" alt="" srcSet=""/>
                                <label>Country</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} name="country" value="<%=add.getUserPhone()%>" type="text" className="form-control" placeholder="Enter Country Name"/>
                        </div>

                        <div style={{width: "30%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/price-tag.png" alt="" srcSet=""/>
                                <label>City</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} name="city" value="<%=add.getCity()%>" type="text" className="form-control" placeholder="Enter City Name"/>
                        </div>

                        <div style={{width: "20%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/discount.png" alt="" srcSet=""/>
                                <label>Pin Code</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} name="pin_code" value="<%=add.getPinCode()%>" type="number" className="form-control" placeholder="Pin code"/>

                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-evenly"}} className="formsectionbtn">
                        <a style={{textDecoration: "none"}} href="OrderSuccess.jsp"><input style={{width: "7rem", padding: "0.7rem"}} className="newsectionbtn" type="button" value="Order Now"/></a>
                        <a style={{textDecoration: "none"}} href="Product.jsp"><input style={{width: "10rem", padding: "0.7rem"}} className="newsectionbtn" type="button" value="Continue Shopping"/></a>

                    </div>
                </form>*/}
                    {/**/}
                    {/*<form style={{width: 85%;" action="AddressServlet" method="post">
                    <h2 style={{fontSize: 1.5rem; marginLeft:0.5rem; marginBottom:1rem">Personal Details</h2>


                    <div className="formrows" >
                        <div style={{width: "90%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/product (2).png" alt="" srcSet=""/>
                                <label>Name</label>
                            </div>

                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} name="first_name" type="text" className="form-control" placeholder="Enter First Name">
                        </div>

                    </div>
                    <div className="formrows" >
                        <div style={{width: "90%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/user (3).png" alt="" srcSet=""/>
                                <label>Name</label>
                            </div>

                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} name="last_name" type="text" className="form-control" placeholder="Enter First Name">
                        </div>

                    </div>
                    <div className="formrows">

                        <div style={{width: "90%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/email.png" alt="" srcSet=""/>
                                <label>Email Address</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}}  name="email_address" type="email" className="form-control" placeholder="Enter Email">

                        </div>

                    </div>
                    <div className="formrows">

                        <div style={{width: "90%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/package.png" alt="" srcSet=""/>
                                <label>Phone Number</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}}  name="phone_no" type="number" className="form-control" placeholder="Enter Phone Number">
                        </div>

                    </div>
                    <h2 style={{fontSize: "1.5rem", marginLeft:"0.5rem", marginBottom:"1rem", marginTop: "2rem"}}>Address Details</h2>
                    <div className="formrows">
                        <div style={{width: "90%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/product (2).png" alt="" srcSet=""/>
                                <label>Street Address</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} name="street_address"  type="text" className="form-control" placeholder="Enter Address">
                        </div>
                    </div>
                    <div className="formrows" style={{display: "flex"}}>

                        <div style={{width: "30%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/package.png" alt="" srcSet=""/>
                                <label>Country</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} name="country"  type="text" className="form-control" placeholder="Enter Country Name">
                        </div>

                        <div style={{width: "30%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/price-tag.png" alt="" srcSet=""/>
                                <label>City</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} name="city" type="text" className="form-control" placeholder="Enter City Name">
                        </div>

                        <div style={{width: "20%", margin: "auto"}} className="formcol">
                            <div className="formlevel">
                                <img style={{width: "2rem", marginRight:"1rem"}} src="img/discount.png" alt="" srcSet=""/>
                                <label>Pin Code</label>
                            </div>
                            <input style={{color:"black",padding: "0.3rem", marginBottom: "1rem", borderRadius: "0.4rem"}} name="pin_code"  type="number" className="form-control" placeholder="Pin code">

                        </div>
                    </div>
                    <div style={{display: flex; justifyContent: center " className="formsectionbtn">
                        <a style={{textDecoration: "none"}} href="OrderSuccess.jsp"><input style={{width: "7rem", padding: "0.7rem"}} className="newsectionbtn" type="button" value="Order Now"></a>
                        <a style={{textDecoration: "none"}} href="Product.jsp"><input style={{width: 10rem; padding: 0.7rem" className="newsectionbtn" type="button" value="Continue Shopping"></a>
                    </div>
                </form>}
               
            </div>




        </div>*/}


                </div>
            </div>

            <Footer />
        </>
    )
}

export default Cart