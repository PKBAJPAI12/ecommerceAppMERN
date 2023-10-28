import React from "react";
function Footer() {
  return (
    <>
    <br/>
    <br/>
      <hr />
      <div
        style={{
          marginBottom: "4rem",
          flexFlow: "row wrap",
          justifyContent: "center",
        }}
        className="section"
      >
        <div className="cardfooter">
          <img
            style={{ width: "4.5rem", margin: "0.4rem" }}
            src={require(`../img/truck.png`)}
            alt=""
            srcset=""
          />
          <div className="footerhead">
            <h3 style={{ fontSize: "1.1rem" }}>FREE SHIPPING</h3>
            <p style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>
              Order Above &#x20b9;499
            </p>
          </div>
        </div>
        <div className="cardfooter">
          <img
            style={{ width: "4.5rem", margin: "0.4rem" }}
            src={require(`../img/return-delivery-box.png`)}
            alt=""
            srcset=""
          />
          <div className="footerhead">
            <h3 style={{ fontSize: "1.1rem" }}>EASY RETURNS</h3>
            <p style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>
              15 Days Return and Replacement
            </p>
          </div>
        </div>
        <div className="cardfooter">
          <img
            style={{ width: "4.5rem" }}
            src="img/24-hour-call-service.png"
            alt=""
            srcset=""
          />
          <div className="footerhead">
            <h3 style={{ fontSize: "1.1rem" }}>24/7 SERVICE</h3>
            <p style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>
              24/7 Service Availiable
            </p>
          </div>
        </div>
        <div className="cardfooter">
          <img
            style={{ width: "4.5rem" }}
            src={require(`../img/premium (1).png`)}
            alt=""
            srcset=""
          />
          <div className="footerhead">
            <h3 style={{ fontSize: "1.1rem" }}>QUALITY PRODUCT</h3>
            <p style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>
              Authorised Brand and Quality Product
            </p>
          </div>
        </div>
      </div>
      <div className="sectionfooter">
        <p
          style={{
            textAlign: "center",
            fontSize: "1rem",
            paddingTop: "0.6rem",
          }}
        >
          &#169; 2022 Superior Clothing Brand All Right Reserved
        </p>
      </div>
    </>
  );
}
export default Footer;
