import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import store from "../store";
import {loadUser,logout} from '../actions/userAction';
import { useSelector,useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
function Navbar() {
  const dispatch = useDispatch();
  const navigate=useHistory();
  const alert=useAlert();
  const [showDashboard,setShowDashboard]=useState(false);
  const [isBrandTitle, setIsBrandTitle] = useState(window.innerWidth > 1200);
  const [isBrandLogo, setIsBrandLogo] = useState(window.innerWidth > 1050);
  const [isMobile, setIsMobile] = useState(window.innerWidth > 925);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  function logoutUser(){
    store.dispatch(loadUser()).then(() => {
      dispatch(logout());
      console.log("Logout action dispatched");
      alert.success("Logout Successfully");
      console.log("Navigating to login page");
      navigate.push('/login');
    });
}
  function toggleDashboard() {
    setShowDashboard(!showDashboard);
  }
  useEffect(()=>{
    //store.dispatch(loadUser());
    const handleResize = () => {
      setIsBrandTitle(window.innerWidth > 1200);
      setIsBrandLogo(window.innerWidth > 1050);
      setIsMobile(window.innerWidth > 925);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  })
  return (
    <>
      {isOpen ? (
        <div className="circle7" style={{top:"13rem"}}></div>
      ): (
        <div className="circle7"></div>
      )}
      <div className="navbar">
        <div className="navleft">
          {isMobile? (
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
          ):(
            <>
            {isOpen ? (
              <div style={{display:"flex"}}>
              <img
                onClick={()=>setIsOpen(!isOpen)}
                style={{ width: "1rem", height:"1rem", marginTop: "10px"}}
                src={require(`../img/x.png`)}
                alt=""
                srcSet=""
              />
              <ul>
            <li>
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
            ): (
              <div onClick={()=>setIsOpen(!isOpen)}>
            <div className="hamburger"></div>
            <div className="hamburger"></div>
            <div className="hamburger"></div>
            </div>
            )}
            </>
          )}
        </div>
        {isMobile ? (
          <div className="navcenter">
        {isBrandLogo &&
          <img
            style={{ width: "3rem", marginRight: "1rem" }}
            src={require(`../img/shopping-store.png`)}
            alt=""
          />
        }
          {isBrandTitle &&
            <h2 className="">Superior</h2>
          }
        </div>
        ): (
          <></>
        )}
        {isMobile ? (
          <div className="navright">
          <ul>
          {isAuthenticated ? (
              <>
                <li>
                  <img
                    style={{ width: "2.5rem", marginLeft: "0.5rem" }}
                    src={require(`../img/logout-arrow.png`)}
                    alt=""
                    srcSet=""
                  />
                </li>
                <li onClick={logoutUser}>
                  <p>Logout</p>
                </li>
                <li onClick={toggleDashboard} id="dashboard"><div className="circlenav">
                <h1 style={{textAlign: "center"}}>{user.name.charAt(0)}</h1>
            </div></li>
            <div style={{backgroundColor: "white", display: showDashboard ? "inline" : "none"}} className="dashboardnav">
                <div style={{display: "flex", justifyContent: "center", marginTop:"0.5rem", marginBottom:"0.5rem"}}>
                    <div style={{width:"3.2rem", height: "3.2rem"}} className="circlenav">
                        <h1 style={{textAlign: "center", marginTop:"0.5rem"}}>{user.name.charAt(0)}</h1>
                    </div>
                    <div style={{marginLeft: "0.5rem", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>

                </div>
                <hr/>
                <div>
                    <ul style={{flexDirection: "column"}}>
                        {user.role==="admin" &&
                        <li><Link to="/dashboard/admin">My Dashboard</Link> </li>
                        }
                        <li><Link to="/account">My Account</Link> </li>
                        <li><Link to="/orders">My Orders</Link> </li>
                        <li><Link to="/cart">MyCart</Link> </li>
                    </ul>
                </div>

            </div>
              </>
            ) : (
              <>
                <li>
                  <img
                    style={{ width: "2.5rem", marginLeft: "0.5rem" }}
                    src={require(`../img/login-arrow.png`)}
                    alt=""
                    srcSet=""
                  />
                </li>
                <li>
                <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
          <Search />
        </div>
        ):(
          <></>
        )}
      </div>
    </>
  );
}
export default Navbar;
