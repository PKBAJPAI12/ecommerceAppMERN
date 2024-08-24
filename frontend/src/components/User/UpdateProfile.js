import React, { useState, useEffect } from "react";
import MetaData from "../MetaData";
import Navbar from "../navbar";
import Footer from "../footer";
import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { updateProfile,loadUser,clearErrors } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
const UpdateProfile = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
      const [avatar, setAvatar] = useState("/Profile.png");
      const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
        console.log("done");
      };
      const updateProfileHandler = (e) => {
        const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
      };
      useEffect(() => {
        if (user) {
          setName(user.name);
          setEmail(user.email);
        }
    
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          toast.success("Profile Updated Successfully");
          dispatch(loadUser());
    
          navigate("/account");
    
          dispatch({
            type: UPDATE_PROFILE_RESET,
          });
        }
      }, [dispatch, error, navigate, user, isUpdated]);
  return (
    <>
      <MetaData title="Ecommerce-Update Profile" />
      <Navbar />
      <div
        style={{
          marginTop: "1.5rem",
          marginLeft: "0rem",
          marginRight: "1.5rem",
        }}
        className="section"
      >
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
                srcSet=""
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
                srcSet=""
              />
              <h4 style={{ fontSize: "1.2rem" }}>
                <Link style={{ textDecoration: "none" }} to="/my-order">
                  Orders
                </Link>
              </h4>
            </div>
            <div className="verticalnavele">
              <img
                style={{ width: "2.5rem", marginRight: "1rem" }}
                src={require(`../../img/product (1).png`)}
                alt=""
                srcSet=""
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
                srcSet=""
              />
              <h4 style={{ fontSize: "1.2rem" }}>
                <Link style={{ textDecoration: "none" }} to="/update/profile">
                  Update Profile
                </Link>
              </h4>
            </div>
          </div>
        </div>
        <div style={{ width: "75%" }}>
          <div
            style={{
              marginBottom: "1.5rem",
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
              Update Profile
            </h1>
            <img
              style={{ width: "3rem" }}
              src={require(`../../img/new images/swirly-scribbled-arrow.png`)}
              alt=""
              srcSet=""
            />
          </div>

          <div className="addproductform">
            <img
              id="formimg"
              style={{
                width: "3rem",
                padding: "2rem",
                boxSizing: "content-box",
              }}
              src="img/hand (1).png"
              alt=""
              srcSet=""
            />
            <form style={{ width: "90%" }} onSubmit={updateProfileSubmit} encType="multipart/form-data">
              <div className="formrows">
                <div
                  style={{ width: "90%", margin: "auto" }}
                  className="formcol"
                >
                  <div className="formlevel">
                    <img
                      style={{ width: "2rem", marginRight: "1rem" }}
                      src={require(`../../img/new images/product (2).png`)}
                      alt=""
                      srcSet=""
                    />
                    <label>User Name</label>
                  </div>
                  <input
                    style={{
                      padding: "0.3rem",
                      marginBottom: "1rem",
                      borderRadius: "0.4rem",
                    }}
                    value={name}
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="formrows">
                <div
                  style={{ width: "90%", margin: "auto" }}
                  className="formcol"
                >
                  <div className="formlevel">
                    <img
                      style={{ width: "2rem", marginRight: "1rem" }}
                      src={require(`../../img/new images/product (2).png`)}
                      alt=""
                      srcSet=""
                    />
                    <label>User Email</label>
                  </div>
                  <input
                    style={{
                      padding: "0.3rem",
                      marginBottom: "1rem",
                      borderRadius: "0.4rem",
                    }}
                    value={email}
                    type="text"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="formrows">
                <div
                  style={{ width: "90%", margin: "auto" }}
                  className="formcol"
                >
                  <div className="formlevel">
                    <img
                      style={{ width: "2rem", marginRight: "1rem" }}
                      src={require(`../../img/new images/category.png`)}
                      alt=""
                      srcSet=""
                    />
                    <label>Profile</label>
                  </div>
                  <input
                    type="file"
                    style={{
                      padding: "0.3rem",
                      marginBottom: "1rem",
                      borderRadius: "0.4rem",
                    }}
                    name="avatar"
                    className="form-control"
                    placeholder="Enter Name"
                    accept="image/*"
                    onChange={updateProfileHandler}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", justifyContent: "center" }}
                className="formsectionbtn"
              >
                <button style={{ margin: "1rem" }} type="submit">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Submit
                </button>
                <button style={{ margin: "1rem" }} type="reset">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProfile;
