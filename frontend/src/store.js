import { combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    productsReducer,
    productDetailsReducer,
    newReviewReducer,
} from "./reducers/productReducer";

import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
} from "./reducers/userReducers";

import { cartReducer } from "./reducers/cartReducer";
import {
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
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

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [thunk],
    devTools: composeWithDevTools(applyMiddleware(thunk)),
});

export default store;
