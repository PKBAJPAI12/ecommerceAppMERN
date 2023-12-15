import React, { useState, useEffect } from "react";
import MetaData from "../MetaData";
import Navbar from "../navbar";
import Footer from "../footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Profile = () => {
    const { isAuthenticated,user } = useSelector(
        (state) => state.user
      );
    return (
     <>  
        <MetaData title="Ecommerce-Profile" />
        <Navbar/>
        {isAuthenticated &&
        <>
        <div style={{marginTop:"1.5rem", marginLeft: "0rem", marginRight: "1.5rem"}}  className="section">
        <div
          style={{
            width: "25%",
            backgroundColor: "white",
            borderTopRightRadius: "5rem",
            marginRight: "2rem",
            borderTop: "2px solid #E110E9",
            borderRight: "1px solid #E110E9",
          }}
        >
          <div className="verticalnav">
            <div
              style={{ borderTopRightRadius: "1.1rem" }}
              className="verticalnavele"
            >
              <img
                style={{ width: "2.5rem", marginRight: "1rem" }}
                src={require(`../../img/dashboard.png`)}
                alt=""
                srcset=""
              />
              <h4 style={{ fontSize: "1.2rem" }}>
                <Link style={{ textDecoration: "none" }} to="/account">
                  Account
                </Link>
              </h4>
            </div>
            <div className="verticalnavele">
              <img
                style={{ width: "2.5rem", marginRight: "1rem" }}
                src={require(`../../img/orders.png`)}
                alt=""
                srcset=""
              />
              <h4 style={{ fontSize: "1.2rem" }}>
                <Link style={{ textDecoration: "none" }} to="/order">
                  Orders
                </Link>
              </h4>
            </div>
            <div className="verticalnavele">
              <img
                style={{ width: "2.5rem", marginRight: "1rem" }}
                src={require(`../../img/product (1).png`)}
                alt=""
                srcset=""
              />
              <h4 style={{ fontSize: "1.2rem" }}>
                <Link style={{ textDecoration: "none" }} to="/cart">
                  My Cart
                </Link>
              </h4>
            </div>
            <div className="verticalnavele">
              <img
                style={{ width: "2.5rem", marginRight: "1rem" }}
                src={require(`../../img/product (1).png`)}
                alt=""
                srcset=""
              />
              <h4 style={{ fontSize: "1.2rem" }}>
                <Link style={{ textDecoration: "none" }} to="/cart">
                  Update Profile
                </Link>
              </h4>
            </div>
          </div>
        </div>

    <div style={{width:"75%"}}>

        <div style={{marginBottom: "1.5rem", display: "flex", justifyContent: "center"}}>
            <h1 style={{marginRight:"1rem", fontSize: "2.2rem", fontStyle: "italic", fontFamily: "cursive"}}>Account Details </h1>
            <img style={{width: "3rem"}} src={require(`../../img/swirly-scribbled-arrow.png`)} alt="" srcset=""/>
        </div>

        <div className="brandproduct">
<div style={{top:"14rem", padding: "4rem 0rem", borderTop: "1px solid white", boxShadow: "2px 2px 10px"}} className="servicesection">
      <div style={{width:"30%", justifyContent: "center", display: "flex"}}>
          <img style={{width: "10rem"}} src={require(`../../img/user (1).png`)}/>
    </div>
<div style={{width:"70%", flexDirection: "column"}}>
    <div className="servicecard">
        <h4><strong>Name:</strong>{user.name}</h4>
    </div>
    <div className="servicecard">
        <h4><strong>Role:</strong>{user.role}</h4>
    </div>
    <div className="servicecard">
        <h4><strong>Email Address:</strong>{user.email}</h4>
    </div>
    <div className="servicecard">
        <h4><strong>Joined on:</strong>{String(user.createdAt).substr(0, 10)}</h4>
    </div>
</div>
</div>
        </div>
    </div>

       </div>
        <hr/>
        </>
        }
        <Footer/>
     </>
    )
}
export default Profile;
