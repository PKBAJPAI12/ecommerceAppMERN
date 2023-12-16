import React, { useState, useEffect } from "react";
import MetaData from "../MetaData";
import Navbar from "../navbar";
import Footer from "../footer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  forgotPassword,
  loadUser,
  clearErrors,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
const ForgetPassword=()=>{
    const dispatch=useDispatch();
    const alert=useAlert();
    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
      );
    const [email,setEmail]=useState("");
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
      };
    
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
          alert.success(message);
        }
      }, [dispatch, error, alert, message]);
    return (
        <>
      <MetaData title="Ecommerce-Forget Password" />
      <Navbar />
      <div className="loginsection" style={{maxWidth:"55%", margin:"3rem auto"}}>
        <div className="rightlogin" style={{width:"60%"}}>
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
            <h1 style={{ fontSize: "1.9rem", margin: "auto" }}>Forgot Password</h1>
          </div>
          <form style={{ width: "80%" }} onSubmit={forgotPasswordSubmit}>
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
                name="email"
                type="email"
                value={email}
                className="form-control"
                placeholder="Enter email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="formsectionbtn" style={{display:"flex"}}>
              <button
                type="submit"
                className="leftsectionbtn"
                style={{ marginRight: "1rem", width:"auto" }}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Forgot Password
              </button>
            </div>
            <h3 style={{ marginTop: "1.5rem" }}>
              Please{" "}
              <Link style={{ textDecoration: "none" }} to="/forget/password">
                <strong style={{ color: "red" }}>Forget Password!</strong>
              </Link>{" "}
              If you not Remember Password
            </h3>
          </form>
        </div>
      </div>
      <Footer />
    </>
    )
}
export default ForgetPassword;