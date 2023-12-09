import React,{ useEffect} from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import store from "../store";
import {loadUser} from '../actions/userAction';
import { useSelector } from "react-redux";
function Navbar() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  useEffect(()=>{
    store.dispatch(loadUser());
  },[])
  return (
    <>
      <div className="circle7"></div>
      <div className="navbar">
        <div className="navleft">
          <ul className="navleftul">
            <li style={{ paddingRight: "0rem" }}>
              <img
                style={{ width: "2.5rem" }}
                src={require(`../img/home (3).png`)}
                alt=""
                srcSet=""
              />
            </li>
            <li style={{ paddingLeft: "0.1rem" }}>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Collections</Link>
            </li>
            <li>
              <Link to="/">Men</Link>
            </li>
            <li>
              <Link to="/">Women</Link>
            </li>
            <li>
              <Link to="/">Kids</Link>{" "}
            </li>
          </ul>
        </div>
        <div className="navcenter">
          <img
            style={{ width: "3rem", marginRight: "1rem" }}
            src={require(`../img/shopping-store.png`)}
            alt=""
          />
          <h2 className="">Superior</h2>
        </div>
        <div className="navright">
          <ul>
          {isAuthenticated ? (
              <>
                <li>
                  <img
                    style={{ width: "2.5rem", marginLeft: "0.5rem" }}
                    src={import("../img/logout-arrow.png")}
                    alt=""
                    srcSet=""
                  />
                </li>
                <li>
                  <Link to="/logout">Logout</Link>{" "}
                </li>
              </>
            ) : (
              <>
                <li>
                  <img
                    style={{ width: "2.5rem", marginLeft: "0.5rem" }}
                    src={import("../img/login-arrow.png")}
                    alt=""
                    srcSet=""
                  />
                </li>
                <li>
                  <Link to="/login">Login</Link>{" "}
                </li>
              </>
            )}
          </ul>
          <Search />
        </div>
      </div>
    </>
  );
}
export default Navbar;
