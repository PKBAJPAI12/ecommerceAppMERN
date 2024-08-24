import React, { useState, useEffect } from "react";
import MetaData from "../MetaData";
import Navbar from "../navbar";
import Footer from "../footer";
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../../actions/orderActions";

const MyOrders = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(async ()=>{
      await dispatch(myOrders());
    })
  
  return (
    <>
        <MetaData title="My Orders" />
        <Navbar/>
        <Footer/>
    </>
  )
}

export default MyOrders