import React, { useState, useEffect } from "react";
import MetaData from "../MetaData";
import Navbar from '../navbar';
import Footer from "../footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  //const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(`/account`);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);
  return (
    <>
      <MetaData title="Ecommerce-Login" />
      <Navbar/>
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
            <h1 style={{ fontSize: "1.9rem", margin: "auto" }}>Login</h1>
          </div>
          <form style={{ width: "75%" }} onSubmit={loginSubmit}>
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
                name="password"
                type="password"
                value={password}
                className="form-control"
                placeholder="Enter Password"
                onChange={(e)=>setPassword(e.target.value)}
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
                Log In
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
              <Link style={{ textDecoration: "none" }} to="/signup">
                <strong style={{ color: "red" }}>Sign Up Now!</strong>
              </Link>{" "}
              If you are First Time User
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
            <img
              style={{ width: "20rem" }}
              src={require(`../../img/shopping.png`)}
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};
export default Login;
