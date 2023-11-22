import ReactStars from "react-rating-stars-component";
import React from "react";
const ReviewCard = ({ review }) => {
  const options = {
    edit:false,
    value: review.rating,
    color: "rgba(20,20,20,0.1",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 18 : 22,
    isHalf: true,
  };

  return (
    <div className="reviewCard">
      <img src={require(`../img/Profile.png`)} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
