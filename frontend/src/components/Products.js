import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import MetaData from "./MetaData";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { getProduct } from "../actions/productActions";
import {useSelector,useDispatch} from "react-redux";
import { useAlert } from "react-alert";
function Products() {
  const alert = useAlert();
  const dispatch=useDispatch();
  const {loading,error,products,productsCount}=useSelector(state=>state.products);
  
  useEffect(() => {
    if (error) {
      console.log("error");
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error]);
  /*let products1 = [
    {
      id: 9283,
      name: "Easy Care Textured Tshirt",
      images: [
        {
          url: "jdie_product_list.webp",
        },
      ],
      options: {
        edit: false,
        color: "rgba(20,20,20,0.1",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 18 : 22,
        value: 3.5,
        isHalf: true,
      },
      price: 1990,
      discount: 10,
    },
  ];*/
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 18 : 22,
    isHalf: true,
  };
  return (
    <>
    <MetaData title="Ecommerce-Products" />
    <div style={{ flexDirection: "column" }} className="section">
      <div style={{ display: "flex", marginTop: "3rem" }}>
        <div style={{ width: "25%", marginTop: "2rem" }}>
          <div className="collectionsection">
            <h1 style={{ marginBottom: "0.7rem", fontSize: "1.5rem" }}>
              Collections
            </h1>
            <ul style={{ width: "11rem" }}>
              <li className="collectionsectionli">
                <a
                  style={{ textDecoration: "none" }}
                  href="Product.jsp?collection=allcol"
                >
                  All Collection
                </a>{" "}
              </li>
              <li className="collectionsectionli">
                <a
                  style={{ textDecoration: "none" }}
                  href="Product.jsp?collection=Mens"
                >
                  Men's
                </a>{" "}
              </li>
              <li className="collectionsectionli">
                <a
                  style={{ textDecoration: "none" }}
                  href="Product.jsp?collection=Womens"
                >
                  Women's
                </a>{" "}
              </li>
              <li className="collectionsectionli">
                <a
                  style={{ textDecoration: "none" }}
                  href="Product.jsp?collection=Kids"
                >
                  Kid's
                </a>{" "}
              </li>
            </ul>
          </div>
          <div className="categorysection">
            <h1 style={{ marginBottom: "0.7rem", fontSize: "1.5rem" }}>
              Category
            </h1>

            <ul style={{ width: "11rem" }}>
              <li className="collectionsectionli">
                <a
                  style={{ textDecoration: "none" }}
                  href="Product.jsp?category=allcat"
                >
                  All Category
                </a>{" "}
              </li>
              <li className="collectionsectionli">
                <a
                  style={{ textDecoration: "none" }}
                  href="Product.jsp?category=Casual"
                >
                  Casual
                </a>{" "}
              </li>
              <li className="collectionsectionli">
                <a
                  style={{ textDecoration: "none" }}
                  href="Product.jsp?category=Sports"
                >
                  Sports
                </a>{" "}
              </li>
              <li className="collectionsectionli">
                <a
                  style={{ textDecoration: "none" }}
                  href="Product.jsp?category=Formal"
                >
                  Formal
                </a>{" "}
              </li>
            </ul>
          </div>
          <div className="pricesection">
            <h1 style={{ marginBottom: "0.7rem", fontSize: "1.5rem" }}>
              Price
            </h1>
            <ul style={{ width: "11rem" }}>
              <li className="collectionsectionli">
                <a
                  style={{ textDecoration: "none" }}
                  href="Product.jsp?price=low"
                >
                  Low to High
                </a>{" "}
              </li>
              <li className="collectionsectionli">
                <a
                  style={{ textDecoration: "none" }}
                  href="Product.jsp?price=high"
                >
                  High to Low
                </a>{" "}
              </li>
            </ul>
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
                fontSize: "1.5rem",
                fontStyle: "italic",
                fontFamily: "cursive",
              }}
            >
              All Fashion Style{" "}
            </h1>
          </div>
          <>{loading?<Loader/>:<div className="brandproduct">
            {products && products.map((product) => (
              <Link
                style={{
                  width: "15rem",
                  height: "22.1rem",
                  background: "linear-gradient(white,#F5F7F9)",
                  textDecoration: "none",
                }}
                className="card"
                to={`${product._id}`}
              >
                <div style={{height:"13rem"}}><img
                  style={{
                    width: "15rem",
                    height: "13rem",
                    borderTopLeftRadius: "2rem",
                  }}
                  src={require(`../img/${product.images[0].url}`)}
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
                <div className="leftsectionbtn1">
                  <input
                    style={{ width: "15rem", borderTopRightRadius: "0rem" }}
                    type="button"
                    onclick="add_to_cart()"
                    value="Add to Cart"
                  />
                </div>
              </Link>
            ))}
          </div>}</>
        </div>
      </div>
    </div>
    </>
  );
}
export default Products;