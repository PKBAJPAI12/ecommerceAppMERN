import React from "react";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
const signupUser = () => {
  return (
    <>
    <MetaData title="Ecommerce-Signup" />
    <div className="loginsection">
      <div className="rightlogin">
        <div className="triangle"></div>
        <div
          style={{ display: "flex", marginBottom: "1.5rem" }}
          className="head1"
        >
          <img
            style={{
              width: "2.5rem",
              alignItems: "center",
              marginRight: "1rem",
            }}
            src={require(`../../img/right.png`)}
            alt=""
          />
          <h1 style={{ fontSize: "1.9rem", margin: "auto" }}>Sign Up</h1>
        </div>
        <form style={{ width: "75%" }}>
          <div className="formcol">
            <div className="formlevel">
              <img
                style={{ width: "2rem", marginRight: "1rem" }}
                src={require(`../../img/user (2).png`)}
                alt=""
                srcset=""
              />
              <label>Name</label>
            </div>
            <input
              style={{
                color: "black",
                padding: "0.5rem",
                marginBottom: "1rem",
                borderRadius: "0.4rem",
              }}
              name="user_name"
              type="text"
              className="form-control"
              placeholder="Enter Name"
            />
          </div>
          <div className="formcol">
            <div className="formlevel">
              <img
                style={{ width: "2rem", marginRight: "1rem" }}
                src={require(`../../img/email.png`)}
                alt=""
                srcset=""
              />
              <label>Email Address</label>
            </div>
            <input
              style={{
                color: "black",
                padding: "0.5rem",
                marginBottom: "1rem",
                borderRadius: "0.4rem",
              }}
              name="user_email"
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="formcol">
            <div className="formlevel">
              <img
                style={{ width: "2rem", marginRight: "1rem" }}
                src={require(`../../img/lock (1).png`)}
                alt=""
                srcset=""
              />
              <label>Password</label>
            </div>
            <input
              style={{
                color: "black",
                padding: "0.5rem",
                marginBottom: "1rem",
                borderRadius: "0.4rem",
              }}
              name="user_password"
              type="password"
              className="form-control"
              placeholder="Enter Password"
            />
          </div>
          <div className="formsectionbtn">
            <button
              type="submit"
              className="leftsectionbtn"
              style={{ marginRight: "1rem" }}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Sign Up
            </button>
            <button className="leftsectionbtn" type="reset">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Reset
            </button>
          </div>
          <h3 style={{ marginTop: "1.5rem" }}>
            Please
            <Link style={{ textDecoration: "none" }} to="/login">
              <strong style={{ color: "red" }}>Login Now!</strong>
            </Link>
            If you have Already Account
          </h3>
        </form>
      </div>
      <div className="leftlogin">
        <div className="loginbox">
          <h1
            style={{
              fontSize: "1.9rem",
              marginTop: "2.5rem",
              marginBottom: "1rem",
              color: "white",
            }}
          >
            Open the Shopping Door
          </h1>
          <img style={{ width: "20rem" }} src={require(`../../img/shopping.png`)} alt="" />
        </div>
      </div>
    </div>
    </>
  );
};
export default signupUser;
