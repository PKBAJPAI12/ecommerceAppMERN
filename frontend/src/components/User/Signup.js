import React, { useState,useEffect } from "react";
import MetaData from "../MetaData";
import Navbar from '../navbar';
import Footer from "../footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, loadUser, register } from "../../actions/userAction";
const Signup = () => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const {isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const signupSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    await dispatch(register(myForm));
    setTimeout(() => {
      if (isAuthenticated) {
        navigate('/account');
        toast.success("Login Successfully");
      }
    }, 8000);
    console.log("done");
  };
  const inputHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  // useEffect(() => {
  //   console.log("Loading user...");
  //   dispatch(loadUser());
  // }, [dispatch]);
  
  useEffect(() => {
    console.log("isAuthenticated changed:", isAuthenticated);
    if (isAuthenticated) {
      navigate('/account');
      toast.success("Login Successfully");
    }
  }, [isAuthenticated, navigate]);
  
  console.log('authenticate',isAuthenticated)
  return (
    <>
    <MetaData title="Ecommerce-Signup" />
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
          <h1 style={{ fontSize: "1.9rem", margin: "auto" }}>Sign Up</h1>
        </div>
        <form style={{ width: "75%" }} onSubmit={signupSubmit} encType="multipart/form-data">
          <div className="formcol">
            <div className="formlevel">
              <img
                style={{ width: "2rem", marginRight: "1rem" }}
                src={require(`../../img/user (2).png`)}
                alt=""
                srcSet=""
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
              name="name"
              value={name}
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={inputHandler}
            />
          </div>
          <div className="formrows">
          <div style={{width: "45%"}} className="formcol">
            <div className="formlevel">
              <img
                style={{ width: "2rem", marginRight: "1rem" }}
                src={require(`../../img/email.png`)}
                alt=""
                srcSet=""
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
              value={email}
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={inputHandler}
            />
        </div>
          <div style={{width: "45%"}} className="formcol">
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
              placeholder="Enter Password"
              onChange={inputHandler}
            />
          </div>
          </div>
          <div className="formcol">
            <div className="formlevel">
              <img
                style={{ width: "2rem", marginRight: "1rem" }}
                src={require(`../../img/user (2).png`)}
                alt=""
                srcSet=""
              />
              <label>Upload Profile Pic</label>
            </div>
            <input
              style={{
                color: "black",
                padding: "0.5rem",
                marginBottom: "1rem",
                borderRadius: "0.4rem",
              }}
              name="avatar"
              type="file"
              accept="image/*"
              className="form-control"
              placeholder="Upload Pic"
              onChange={inputHandler}
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
    <Footer/>
    </>
  );
};
export default Signup;
