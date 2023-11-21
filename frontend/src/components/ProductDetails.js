import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../actions/productActions";
//import ReviewCard from "./ReviewCard.js";
import Loader from "./Loader";
//import { useAlert } from "react-alert";
import MetaData from "./MetaData";
import { UncontrolledCarousel } from "reactstrap";
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const { id } = useParams();
  console.log(product);
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
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
               <Slider {...settings}>
                {product.images && product.images.map((imageUrl, index) => (
                  <div key={index}>
                    <img
                      style={{width:"366px",height:"550px"}}
                      src={require(`../img/${imageUrl.url}`)}
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </Slider>
              <div>
                <h1>gh</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
