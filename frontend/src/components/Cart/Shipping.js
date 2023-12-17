import React, { useState, useEffect } from "react";
import Footer from "../footer";
import Navbar from "../navbar";
import MetaData from "../MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Country, State } from "country-state-city";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { useAlert } from "react-alert";
import {saveShippingInfo} from "../../actions/cartActions"
import { useNavigate } from "react-router-dom";
const Shipping = () => {
    
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const shippingSubmit=(e)=>{
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  }

  return (
    <>
      <MetaData title="Ecommerce-Shipping" />
      <Navbar />
      <CheckoutSteps activeStep={0}/>
      <div style={{ marginTop: "1.5rem", marginLeft: "0rem", marginRight: "1.5rem", flexDirection: "column" }} className="section">
                <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
                    <h1 style={{ marginRight: "1rem", fontSize: "2.2rem", fontStyle: "italic", fontFamily: "cursive" }}>Shipping Information </h1>
                    <img style={{ width: "3rem" }} src={require(`../../img/new images/swirly-scribbled-arrow.png`)} alt="" srcSet="" />
                </div>
      <div style={{ width: "80%", margin:"auto" }}>
        <div
          className="addproductform"
          style={{
            borderTop: "0px solid black",
            borderLeft: "0px solid black",
            borderRight: "0px solid black",
            borderTopLeftRadius: "0rem",
            borderTopRightRadius: "0rem",
          }}
        >
          <img
            id="formimg"
            style={{ width: "3rem", padding: "2rem", boxSizing: "content-box" }}
            src="./img/hand (1).png"
            alt=""
            srcSet=""
          />
          <form style={{ width: "85%" }} encType="multipart/form-data" onSubmit={shippingSubmit}>
            <h2
              style={{
                fontSize: "1.5rem",
                marginLeft: "0.5rem",
                marginBottom: "1rem",
              }}
            >
             Shipping Details
            </h2>
            <div className="formrows">
              <div style={{ width: "90%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <HomeIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>Address</label>
                </div>

                <input
                  style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}
                  name="name"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                />
              </div>
            </div>
            <div className="formrows">
              <div style={{ width: "90%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <PhoneIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>Phone Number</label>
                </div>
                <input
                  style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  name="phone_no"
                  type="number"
                  className="form-control"
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>
            <div className="formrows" style={{ display: "flex" }}>
              <div style={{ width: "40%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <PublicIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>Country</label>
                </div>
                <select
                style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
              </div>
              <div style={{ width: "40%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <TransferWithinAStationIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>State</label>
                </div>
                <select
                style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                
              >
                <option value="">State</option>
                {State &&
                    State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
              </div>
            </div>
            <div className="formrows" style={{ display: "flex" }}>
            <div style={{ width: "40%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <LocationCityIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>City</label>
                </div>
                <input
                  style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  name="city"
                  type="text"
                  className="form-control"
                  placeholder="Enter City Name"
                />
              </div>
            <div style={{ width: "40%", margin: "auto" }} className="formcol">
                <div className="formlevel">
                  <PinDropIcon
                    style={{ width: "2rem", marginRight: "1rem" }}
                  />
                  <label>Pin Code</label>
                </div>
                <input
                  style={{
                    color: "black",
                    padding: "0.3rem",
                    marginBottom: "1rem",
                    borderRadius: "0.4rem",
                  }}
                  name="pin_code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  type="number"
                  className="form-control"
                  placeholder="Pin code"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
</div>
      <Footer />
    </>
  );
};

export default Shipping;
