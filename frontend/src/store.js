import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer,productDetailReducer,productReviewReducer, } from "./reducers/productReducer";
import {
  userReducer,profileReducer,forgotPasswordReducer,
} from "./reducers/userReducer";
import { newOrderReducer } from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";
const reducer = combineReducers({
    products:productReducer,
    productDetail:productDetailReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    productReview: productReviewReducer,
    order: newOrderReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
