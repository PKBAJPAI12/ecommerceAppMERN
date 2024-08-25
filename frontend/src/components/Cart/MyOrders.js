import React, { useState, useEffect } from "react";
import MetaData from "../MetaData";
import Navbar from "../navbar";
import Footer from "../footer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../../actions/orderActions";

const MyOrders = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [pOrders, setPOrders] = useState([]);
    useEffect(async ()=>{
      const allOrders = await dispatch(myOrders());
      const orders = allOrders.reduce((acc, order) => {
        acc.push(...order.orderItems);
        return acc;
      }, []);
      setPOrders(orders);
    }, [dispatch])
  
  return (
    <>
        <MetaData title="My Orders" />
        <Navbar/>
        <div style={{ marginTop: "1.5rem", marginLeft: "0rem", marginRight: "1.5rem", flexDirection: "column" }} className="section">
                <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
                    <h1 style={{ marginRight: "1rem", fontSize: "2.2rem", fontStyle: "italic", fontFamily: "cursive" }}>My Orders </h1>
                    <img style={{ width: "3rem" }} src={require(`../../img/new images/swirly-scribbled-arrow.png`)} alt="" srcSet="" />
                </div>
                    <div style={{ width: "80%", margin:"auto" }}>

                        <div className="card-body" style={{ margin: "auto", width: "85%", marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.6rem" }}>All Orders </h2>
                            <div className="cart-body">
                               {(pOrders.length>0)?
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
                                    {pOrders.map((item)=>(
                                        <tr style={{background: "linear-gradient(45deg,rgb(224, 197, 215),transparent)"}}>
                                        <td style={{display: "flex", justifyContent: "center"}}><img style={{width:"5rem", marginTop: "1rem"}} src={require(`../../img/${item.image}`)} srcSet=""/></td>
                                        <td style={{fontSize: "1.1rem",textAlign: "center"}}><Link to={`/product/${item.product}`}>{item.name}</Link></td>
                                        <td style={{fontSize: "1.1rem",textAlign: "center"}}>{item.price}</td>
                                        <td style={{fontSize: "1.1rem",textAlign: "center"}}>{item.quantity}</td>
                                        <td style={{fontSize: "1.1rem", textAlign: "center"}}>{item.quantity*item.price}</td>
                                        <td style={{display: "flex", justifyContent: "center", paddingBottom: "1.5rem"}}><button style={{padding: "0.5rem", borderRadius: "0.7rem", color: "blue", background: "linear-gradient(45deg,red,white)"}}  className="">Order Details</button></td>
                                    </tr>
                                    ))
                                    }
                                   </table> 
                                </>
                                :<>
                                <h3>You have not order anything till now</h3>
                                <Link to="/products">View Products for Place your first Order</Link>
                                </>
                                }
                            </div>
                        </div>
                    </div>
            </div>
        <Footer/>
    </>
  )
}

export default MyOrders