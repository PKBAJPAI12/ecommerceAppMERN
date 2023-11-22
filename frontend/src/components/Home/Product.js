import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const Product = ({ product }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 18 : 22,
        isHalf: true,
      };
  return (
    <Link
                style={{
                  width: "15rem",
                  height: "20rem",
                  background: "linear-gradient(white,#F5F7F9)",
                  textDecoration: "none",
                }}
                className="card"
                to={`/product/${product._id}`}
              >
                <div style={{height:"13rem"}}><img
                  style={{
                    width: "15rem",
                    height: "13rem",
                    borderTopLeftRadius: "2rem",
                  }}
                  src={require(`../../img/${product.images[0].url}`)}
                  alt={product.name}
                  srcSet=""
                /></div>
                <div className="offer">
                  <h3 style={{ fontSize: "0.8rem", textAlign: "center" }}>
                    {product.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "0.3rem",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <h2 style={{ color: "red" }}>
                      Flat 10% Off
                    </h2>
                    <h2>RS.{product.price}</h2>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "0.3rem",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ReactStars value={product.rating} {...options} />
                    <span style={{ textAlign: "center", fontSize: "12px" }}>
                      ({product.numOfReviews})
                    </span>
                  </div>
                  <h2 style={{ fontSize: "1rem" }}>
                    RS.{(product.price * (100 - 10)) / 100}
                  </h2>
                </div>
    </Link>
  );
};

export default Product;
