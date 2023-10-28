import React from 'react';

function Brand({ element }) {
  return (
    element.map((item) => (
      <div className="card" key={item.image}>
        <img
          style={{ width: "20rem", height: "15rem", borderTopLeftRadius: "2rem" }}
          src={require(`../img/${item.image}`)}
          alt=""
          srcSet=""
        />
        <div className="offer">
          <h1>Flat {item.discount}% Off on All Products</h1>
        </div>
        <div>
          <a style={{ textDecoration: "none" }} href="Product.jsp">
            <input
              className="newsectionbtn"
              style={{ width: "20rem", padding: "0.6rem", borderTopRightRadius: "0rem" }}
              type="button"
              value="Shop Now"
            />
          </a>
        </div>
      </div>
    ))
  );
}

export default Brand;
