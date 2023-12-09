import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Slider from "react-slick";
import ReviewCard from "./ReviewCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./productDetails.css";
import Navbar from '../navbar';
import Footer from "../footer";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productActions";
//import ReviewCard from "./ReviewCard.js";
import Loader from "../Loader";
//import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import { UncontrolledCarousel } from "reactstrap";
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 18 : 22,
    isHalf: true,
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <Navbar />
          <div className="ProductDetails">
            <div>
               <Slider {...settings}>
                {product.images && product.images.map((imageUrl, index) => (
                  <div key={index}>
                    <img
                      style={{width:"366px",height:"400px",borderRadius:"15px"}}
                      src={require(`../../img/${imageUrl.url}`)}
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
              <ReactStars value={product.rating} {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input readOnly type="number"  />
                    <button >+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          
          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
      <Footer />
    </>
  );
};

export default ProductDetails;
