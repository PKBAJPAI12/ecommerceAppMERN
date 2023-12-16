import React, { useState, useEffect } from "react";
import MetaData from "../MetaData";
import Navbar from "../navbar";
import Footer from "../footer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePassword,
  loadUser,
  clearErrors,
} from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useAlert } from "react-alert";
const UpdatePassword = () => {
  const dispatch=useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const updatePasswordSubmit=(e)=>{
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
      dispatch(updatePassword(myForm));
    }
    
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");

      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);
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
            <h1 style={{ fontSize: "1.9rem", margin: "auto" }}>Update Password</h1>
          </div>
          <form style={{ width: "80%" }} onSubmit={updatePasswordSubmit}>
            <div className="formcol">
              <div className="formlevel">
                <img
                  style={{ width: "2rem", marginRight: "1rem" }}
                  src={require(`../../img/lock (1).png`)}
                  alt=""
                  srcset=""
                />
                <label>Old Password</label>
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
                value={oldPassword}
                className="form-control"
                placeholder="Enter Old Password"
                onChange={(e)=>setOldPassword(e.target.value)}
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
                <label>New Password</label>
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
                value={newPassword}
                className="form-control"
                placeholder="Enter New Password"
                onChange={(e)=>setNewPassword(e.target.value)}
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
                Update
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
  );
};
export default UpdatePassword;
