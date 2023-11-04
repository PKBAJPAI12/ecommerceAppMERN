import React, { useEffect } from 'react'
import { getProductDetails } from "../actions/productActions";
import {useSelector,useDispatch} from "react-redux";
import { useParams } from 'react-router-dom';
const ProductDetails = ({match}) => {
  const dispatch=useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const { id } = useParams();
  console.log(product)
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch,id]);
  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails