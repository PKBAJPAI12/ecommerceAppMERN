import React from "react";
import Brand from "./Brand";
function Home() {
    let brands=[
        {
            image:"deal-page-467x316-levis1.jpg",
            discount:15
        },
        {
            image:"2016-06-09.jpg",
            discount:25
        },
        {
            image:"jpg.jpg",
            discount:25
        },
        {
            image:"3302738.webp",
            discount:18
        },
        {
            image:"images.jpg",
            discount:15
        },
        {
            image:"van-heusen-shirt-500x500.png",
            discount:25
        }
    ]
  return (
    <>
      <div className="section">
        <div className="leftsection">
          <h3 style={{fontSize: "1.2rem", marginBottom: "0.6rem", fontStyle: "italic", fontFamily: "cursive"}}>
            New Age Collection's
          </h3>
          <div className="leftsectionh1">
            <h1 style={{fontSize:"3.5rem"}}>Superior will</h1>
            <img
              style={{width:"4rem", marginLeft: "1rem"}}
              src={require("../img/flat-design-people-4682770__340.webp")}
              alt=""
            />
          </div>
          <h1 style={{fontSize:"3.5rem"}}> Make You Different</h1>
          <div className="leftsectionh5">
            <h5>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
              excepturi enim ea deleniti reprehenderit aspernatur!{" "}
            </h5>
          </div>
          <div>
            <a style={{textDecoration: "none"}} href="Product.jsp">
              <input
                style={{width: "9rem"}}
                className="newsectionbtn"
                type="button"
                value="Shop Now"
              />
            </a>
          </div>
        </div>
        <div className="rightsection">
          <div id="circle1"></div>
          <div id="circle2"></div>
          <div id="circle3"></div>
          <img
            style={{position: "relative", left:"6rem", zIndex: "1", width:"20rem"}}
            src={require("../img/online-shopping-for-women-gcf940d030_1280-removebg-preview.png")}
            alt=""
          />
        </div>
      </div>
      <div className="section1">
        <img
          style={{width: "15rem", position: "relative", top:"-5rem", left: "10rem"}}
          src={require("../img/shopping-bags.png")}
          alt=""
          srcset=""
        />
        <div className="container">
          <div className="card1">
            <div style={{height: "4rem"}} className="col1">
              <div className="col1sec">
                <h1 style={{fontSize: "1.7rem", fontStyle: "italic", fontFamily: "cursive"}}>
                  Styles
                </h1>
                <img
                  style={{width:"2.5rem", marginLeft:"0.6rem"}}
                  src={require("../img/fire.png")}
                  alt=""
                />
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className="card2">
            <div style={{height: "4rem"}} className="col2">
              <img
                style={{width:"10rem"}}
                src={require("../img/model-gc65100ef7_640-removebg-preview.png")}
                alt=""
              />
              <h3 style={{textAlign:"center", marginTop:"1rem", fontSize: "1.1rem"}}>
                Men's Styles
              </h3>
              <a
                style={{color:"silver", textAlign:"center", marginTop:"0.7rem", fontSize: "0.9rem", textDecoration: "none", listStyle: "none"}}
                href="Product.jsp?collection=Mens"
              >
                Shop Now &#187;
              </a>
            </div>
          </div>
          <div className="card2">
            <div style={{ height: "4rem"}} className="col3">
              <img
                style={{width:"10rem"}}
                src={require("../img/woman-gd23c17d79_640-removebg-preview.png")}
                alt=""
              />
              <h3 style={{textAlign:"center", marginTop:"1rem", fontSize: "1.1rem"}}>
                Women's Styles
              </h3>
              <a
                style={{color:"silver",textAlign:"center", marginTop:"0.7rem", fontSize: "0.9rem", textDecoration: "none", listStyle: "none"}}
                href="Product.jsp?collection=Womens"
              >
                Shop Now &#187;
              </a>
            </div>
          </div>
          <div className="card2">
            <div style={{height: "4rem"}} className="col4">
              <img
                style={{width:"10rem"}}
                src={require("../img/baby-gf1e0a29f3_640-removebg-preview.png")}
                alt=""
              />
              <h3 style={{textAlign:"center", marginTop:"1rem", fontSize: "1.1rem"}}>
                Kids's Styles
              </h3>
              <a
                style={{color:"silver", textAlign:"center", marginTop:"0.7rem", fontSize:" 0.9rem", textDecoration: "none", listStyle: "none"}}
                href="Product.jsp?collection=Kids"
              >
                Shop Now &#187;
              </a>
            </div>
          </div>
        </div>
        <div className="circle4"></div>
        <div className="circle5"></div>
        <div className="circle6"></div>
      </div>
      <div style={{marginTop:"0rem",flexDirection: "column"}} className="section">
        <div style={{top:"3rem"}} className="circle4"></div>
        <div style={{top:"3.3rem"}} className="circle5"></div>
        <div style={{top:"-0.2rem"}} className="circle6"></div>
        <img
          style={{width: "10rem", position: "absolute", right: "15rem", top:"57rem"}}
          src={require("../img/urgent-shopping.png")}
          alt=""
          srcset=""
        />
        <div style={{margin: "auto", display: "flex"}}>
          <h1 style={{marginRight:"1rem", fontSize: "2.2rem", fontStyle: "italic", fontFamily: "cursive"}}>
            Top Brands{" "}
          </h1>
          <img
            style={{width: "3rem"}}
            src={require("../img/swirly-scribbled-arrow.png")}
            alt=""
            srcset=""
          />
        </div>

        <div className="brandproduct">
          <Brand element={brands}/>
        </div>
      </div>
    </>
  );
}
export default Home;
