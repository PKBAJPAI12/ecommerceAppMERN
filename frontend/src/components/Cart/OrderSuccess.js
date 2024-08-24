import React from "react";
import { useLocation } from "react-router-dom";
import MetaData from "../MetaData";
import Navbar from "../navbar";

const OrderSuccess = () => {
  const location = useLocation();
  const paymentIntentId = location.state?.paymentIntentId;
  
  return (
    <>
      <MetaData title="Order-Success" />
      <Navbar />
      <div
      style={{
        marginTop: "1.5rem",
        marginLeft: "0rem",
        marginRight: "1.5rem",
        flexDirection: "column",
      }}
      className="section"
    >
      <div
        style={{
          marginBottom: "4rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            marginRight: "1rem",
            fontSize: "2.2rem",
            fontStyle: "italic",
            fontFamily: "cursive",
          }}
        >
          Order Success
        </h1>
        <img
          style={{ width: "3rem" }}
          src={require(`../../img/swirly-scribbled-arrow.png`)}
          alt=""
          srcSet=""
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "white",
          width: "45%",
          height: "20rem",
          margin: "auto",
          borderRadius: "2rem",
          border: "2px solid black",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <img style={{ width: "3rem" }} src={require(`../../img/checked.png`)} alt="" srcSet="" />
          <h1>You Order has Completed Successfully</h1>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>
            We Delivered You Order Within 7 Days
          </h1>
          <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>
            Order Id {paymentIntentId}
          </h2>

          <img
            style={{ width: "5rem", marginLeft: "45%", marginTop: "2rem" }}
            src={require(`../../img/recieved.png`)}
            alt=""
            srcSet=""
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default OrderSuccess;
