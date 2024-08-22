import React, { useState, useEffect } from "react";
import MetaData from "../MetaData";
import Navbar from "../navbar";
import Footer from "../footer";
import { Link, useHistory,useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  resetPassword,
  loadUser,
  clearErrors,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
const ResetPassword = () => {
  const dispatch=useDispatch();
  const alert = useAlert();
  const navigate=useHistory();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const { token } = useParams();
    console.log(`token ${token}`);
    const resetPasswordSubmit=(e)=>{
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
      dispatch(resetPassword(token,myForm));
    }
    
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      navigate.push("/account");
    }
  }, [dispatch, error, alert, navigate, success]);
  return (
    <>
      <MetaData title="Ecommerce-Update Password" />
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
            <h1 style={{ fontSize: "1.9rem", margin: "auto" }}>Reset Password</h1>
          </div>
          <form style={{ width: "80%" }} onSubmit={resetPasswordSubmit}>
            <div className="formcol">
              <div className="formlevel">
                <img
                  style={{ width: "2rem", marginRight: "1rem" }}
                  src={require(`../../img/lock (1).png`)}
                  alt=""
                  srcSet=""
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
                name="password"
                type="password"
                value={password}
                className="form-control"
                placeholder="Enter New Password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="formcol">
              <div className="formlevel">
                <img
                  style={{ width: "2rem", marginRight: "1rem" }}
                  src={require(`../../img/lock (1).png`)}
                  alt=""
                  srcSet=""
                />
                <label>Confirm Password</label>
              </div>
              <input
                style={{
                  color: "black",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                  borderRadius: "0.4rem",
                }}
                name="password"
                type="password"
                value={confirmPassword}
                className="form-control"
                placeholder="Enter Confirm Password"
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="formsectionbtn" style={{display:"flex"}}>
              <button
                type="submit"
                className="leftsectionbtn"
                style={{ marginRight: "1rem" }}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit 
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
              Please{" "}
              <Link style={{ textDecoration: "none" }} to="/login">
                <strong style={{ color: "red" }}>Login!</strong>
              </Link>{" "}
              Please Login 
            </h3>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ResetPassword;
