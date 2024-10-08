import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Slider from "react-slick";
import ReviewCard from "./ReviewCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./productDetails.css";
import Navbar from "../navbar";
import Footer from "../footer";
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/cartActions";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productActions";
//import ReviewCard from "./ReviewCard.js";
import Loader from "../Loader";
import { toast } from "react-toastify";
import MetaData from "../MetaData";
import { UncontrolledCarousel } from "reactstrap";
const ProductDetails = () => {
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [comment, setComment] = useState("");

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };
  const { id } = useParams();
  console.log(id);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };
  const submitReviewToggle = () => {
    setOpen(!open);
  };
  const ratingChanged = (newRating) => {
    setReviewRating(newRating);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", reviewRating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  useEffect(async () => {
    await dispatch(getProductDetails(id));
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
                {product.images &&
                  product.images.map((imageUrl, index) => (
                    <div key={index}>
                      <img
                        style={{
                          width: "366px",
                          height: "400px",
                          borderRadius: "15px",
                        }}
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
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
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

              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <ReactStars 
                value={reviewRating}
                onChange={ratingChanged}
                count={5}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews.length>0 ? (
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
