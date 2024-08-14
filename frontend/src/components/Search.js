import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = () => {
  const navigate = useHistory();
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
        navigate.push(`/products/${keyword}`);
    } else {
        navigate.push(`/products`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchHandler(e);
    }
  };

  return (
    <form style={{ display: "flex" }}>
      <div style={{ marginRight: "1rem" }} className="searchform">
        <div className="boximage">
          <img
            style={{ width: "1.8rem" }}
            src={require(`../img/search.png`)}
            alt=""
          />
        </div>
        <input
          style={{ borderColor: "transparent", color: "black" }}
          type="text"
          placeholder="Search a Product"
          name="trans"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div
          style={{
            borderLeft: "1px solid black",
            paddingLeft: "0.8rem",
            display: "flex",
          }}
          className="boximage"
        >
          <a href="#">
            <img
              style={{ width: "1.8rem" }}
              src={require(`../img/cart.png`)}
              alt=""
            />
          </a>
          <span
            className="cart-items"
            style={{
              fontSize: "16px",
              marginTop: "-4px",
              color: "blue",
              marginLeft: "2px",
            }}
          ></span>
        </div>
      </div>
    </form>
  );
};

export default Search;
