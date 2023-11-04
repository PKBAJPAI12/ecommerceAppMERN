import React from 'react'
import "../loader.css";
const Loader = () => {
  return (
    <div>
        <div style={{display:"flex",justifyContent:"center",marginTop:"4rem"}}>
        <img
          className='loader'
          src={require(`../img/waiting.png`)}
          alt=""
          srcSet=""
        />
        </div>
    </div>
  )
}

export default Loader