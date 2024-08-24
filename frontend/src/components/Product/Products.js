import React, { useEffect, useState } from "react";
import Product from "../Home/Product";
import MetaData from "../MetaData";
import Loader from "../Loader";
import Navbar from '../navbar';
import Footer from "../footer";
import { Link } from "react-router-dom";
import { getProduct } from "../../actions/productActions";
import {useSelector,useDispatch} from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import  Pagination from "react-js-pagination";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './product.css'
function Products() {
  
  const dispatch=useDispatch();
  const [currentPage,setCurrentPage]=useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const {loading,error,products,productCount,showPerPage,filterProductCounts}=useSelector(state=>state.products);
  const {keyword} = useParams();
  console.log(keyword)
  console.log(`page ${currentPage}`)
  const handleCurrPage = (e) => {
    setCurrentPage(e);
  };
  const handleSliderChange=(values)=>{
    console.log(`values ${values}`)
    setPrice(values);
    console.log(`price ${price}`)
  }
  useEffect(() => {
    if (error) {
      console.log("error");
      return toast.error(error);
    }
    dispatch(getProduct(keyword,currentPage,price));
  }, [dispatch,keyword,error,currentPage,price]);
  let count=filterProductCounts;
  console.log(`c ${count}`)
  return (
    <>
    <MetaData title="Ecommerce-Products" />
    <Navbar/>
    <div style={{ flexDirection: "column" }} className="section">
      <div style={{ display: "flex", marginTop: "3rem" }}>
        <div style={{ width: "25%", marginTop: "2rem" }}>
        <label>Price</label>
      <Slider
        range
        min={0}
        max={25000}
        value={price}
        onChange={handleSliderChange}
      />
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
          {showPerPage < count && (
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
          )}
          </>}
          </>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
export default Products;
