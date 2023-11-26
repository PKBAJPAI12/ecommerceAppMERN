import React, { useEffect, useState } from "react";
import Product from "../Home/Product";
import MetaData from "../MetaData";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { getProduct } from "../../actions/productActions";
import {useSelector,useDispatch} from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import  Pagination from "react-js-pagination";
import './product.css'
function Products() {
  const alert = useAlert();
  const dispatch=useDispatch();
  const [currentPage,setCurrentPage]=useState(1);
  const {loading,error,products,productCount,showPerPage}=useSelector(state=>state.products);
  const {keyword} = useParams();
  console.log(keyword)
  console.log(`page ${currentPage}`)
  const handleCurrPage = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    if (error) {
      console.log("error");
      return alert.error(error);
    }
    dispatch(getProduct(keyword,currentPage));
  }, [dispatch,keyword,error,currentPage]);
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
                <Link
                  style={{ textDecoration: "none" }}
                  to="/products"
                >
                  All Collection
                </Link>{" "}
              </li>
              <li className="collectionsectionli">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/mens"
                >
                  Men's
                </Link>{" "}
              </li>
              <li className="collectionsectionli">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/women"
                >
                  Women's
                </Link>{" "}
              </li>
              <li className="collectionsectionli">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/kids"
                >
                  Kid's
                </Link>{" "}
              </li>
            </ul>
          </div>
          <div className="categorysection">
            <h1 style={{ marginBottom: "0.7rem", fontSize: "1.5rem" }}>
              Category
            </h1>

            <ul style={{ width: "11rem" }}>
              <li className="collectionsectionli">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/products"
                >
                  All Category
                </Link>{" "}
              </li>
              <li className="collectionsectionli">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/casual"
                >
                  Casual
                </Link>{" "}
              </li>
              <li className="collectionsectionli">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/sports"
                >
                  Sports
                </Link>{" "}
              </li>
              <li className="collectionsectionli">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/Formal"
                >
                  Formal
                </Link>{" "}
              </li>
            </ul>
          </div>
          <div className="pricesection">
            <h1 style={{ marginBottom: "0.7rem", fontSize: "1.5rem" }}>
              Price
            </h1>
            <ul style={{ width: "11rem" }}>
              <li className="collectionsectionli">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/low"
                >
                  Low to High
                </Link>{" "}
              </li>
              <li className="collectionsectionli">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/high"
                >
                  High to Low
                </Link>{" "}
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
          <>{loading?<Loader/>:<><div className="brandproduct">
            {products && products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={showPerPage}
              totalItemsCount={productCount}
              onChange={handleCurrPage}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
          </>}
          </>
        </div>
      </div>
    </div>
    </>
  );
}
export default Products;
