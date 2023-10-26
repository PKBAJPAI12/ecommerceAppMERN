import React from 'react';
function Navbar(){
    return (
        <div className="navbar">
        <div className="navleft">
            <ul className="navleftul">
                <li style={{paddingRight: "0rem"}}><img  style={{width: "2.5rem"}} src={require(`../img/home (3).png`)} alt="" srcset=""/></li>
                <li style={{paddingLeft: "0.1rem"}}><a href="">Home</a> </li>
                <li><a href="">Collections</a></li>
                <li><a href="">Men</a> </li>
                <li><a href="">Women</a> </li>
                <li><a href="">Kids</a> </li>
            </ul>
        </div>
        <div className="navcenter">
            <img style={{width:"3rem", marginRight: "1rem"}} src={require(`../img/shopping-store.png`)} alt=""/>
            <h2 className="">Superior</h2>
        </div>
        <div className="navright">
            <ul>
                <li><img  style={{width: "2.5rem", marginLeft: "0.5rem"}} src={require(`../img/login-arrow.png`)} alt="" srcset=""/></li>
                <li><a href="">Login</a> </li>
            </ul>
            <form style={{display: "flex"}} action="" method="post">
                <div style={{marginRight:"1rem"}} className="searchform">
                    <div  className="boximage">
                        <img style={{width:"1.8rem"}} src={require(`../img/search.png`)} alt="" srcset=""/>
                    </div>
                    <input style={{borderColor: "transparent", color:"white"}} type="text" placeholder="Search" name="trans"/>
                    <div style={{borderLeft:"1px solid black", paddingLeft:"0.8rem",  display: "flex"}} className="boximage">
                   <a href=""  ><img style={{width:"1.8rem"}} src={require(`../img/cart.png`)} alt="" srcset=""/></a>
                        <span className="cart-items" style={{fontSize:"16px", marginTop: "-4px", color: "blue", marginLeft:"2px" }}></span>
                    </div>
                </div>
    
            </form>
    
    
        </div>
    </div>
    )
}
export default Navbar;
