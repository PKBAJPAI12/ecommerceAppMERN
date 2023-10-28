import React from 'react';
function Products(){
    return (
        <div style={{flexDirection: "column"}} className="section">
        <div style={{display: "flex", marginTop: "3rem"}}>
            <div style={{width:"25%", marginTop:"2rem"}}>
                <div className="collectionsection">
                    <h1 style={{marginBottom: "0.7rem", fontSize: "1.5rem"}}>Collections</h1>
                    <ul style={{width:"11rem"}}>
                        <li className="collectionsectionli"><a style={{textDecoration: "none"}} href="Product.jsp?collection=allcol">All Collection</a> </li>
                        <li className="collectionsectionli"><a style={{textDecoration: "none"}} href="Product.jsp?collection=Mens">Men's</a>  </li>
                        <li className="collectionsectionli"><a style={{textDecoration: "none"}} href="Product.jsp?collection=Womens">Women's</a> </li>
                        <li className="collectionsectionli"><a style={{textDecoration: "none"}} href="Product.jsp?collection=Kids">Kid's</a> </li>
                    </ul>
                </div>
                <div className="categorysection">
                    <h1 style={{marginBottom: "0.7rem", fontSize: "1.5rem"}}>Category</h1>
    
                    <ul style={{width:"11rem"}}>
                        <li className="collectionsectionli"><a style={{textDecoration: "none"}} href="Product.jsp?category=allcat">All Category</a> </li>
                        <li className="collectionsectionli"><a style={{textDecoration: "none"}} href="Product.jsp?category=Casual">Casual</a>  </li>
                        <li className="collectionsectionli"><a style={{textDecoration: "none"}} href="Product.jsp?category=Sports">Sports</a> </li>
                        <li className="collectionsectionli"><a style={{textDecoration: "none"}} href="Product.jsp?category=Formal">Formal</a> </li>
                    </ul>
    
                </div>
                <div className="pricesection">
                    <h1 style={{marginBottom: "0.7rem", fontSize: "1.5rem"}}>Price</h1>
                    <ul style={{width:"11rem"}}>
                        <li className="collectionsectionli"><a style={{textDecoration: "none"}} href="Product.jsp?price=low">Low to High</a>  </li>
                        <li className="collectionsectionli"><a style={{textDecoration: "none"}} href="Product.jsp?price=high">High to Low</a> </li>
                    </ul>
    
    
                </div>
    
            </div>
    
            <div style={{width:"75%"}}>
    
                <div style={{marginBottom: "1.5rem", display: "flex", justifyContent: "center"}}>
                    <h1 style={{marginRight:"1rem", fontSize: "1.5rem", fontStyle: "italic", fontFamily: "cursive"}}>All Fashion Style </h1>
                </div>
    
                <div className="brandproduct">
                    <div style={{width: "15rem", height:"20rem", background:"linear-gradient(white,#F5F7F9)"}} className="card">
                        <img style={{width:"15rem", height:"13rem", borderTopLeftRadius: "2rem"}}
                             src={require(`../img/jdie_product_list.webp`)} alt="" srcset=""/>
                        <div className="offer">
                            <h3 style={{fontSize: "0.8rem", textAlign:"center"}}>Easy Care Textured Tshirt</h3>
                            <div style={{display: "flex", marginTop:"0.3rem", justifyContent: "space-between", alignItems: "flex-end"}}>
                                <h2 style={{color: "red"}}>Flat 10% Off</h2>
                                <h2>RS.1990</h2>
                            </div>
                            <h2 style={{textAlign: "center", fontSize: "1rem"}}>RS.1791</h2>
    
    
                        </div>
                        <div  className="leftsectionbtn1">
                            <input style={{width: "15rem", borderTopRightRadius: "0rem"}} type="button" onclick="add_to_cart()" value="Add to Cart"/>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    
    </div>
    )
}
export default Products;