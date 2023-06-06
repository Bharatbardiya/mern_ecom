import { combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducer,
  productDetailsReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
});

let initialState = {};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: [thunk],
  devTools: composeWithDevTools(applyMiddleware(thunk)),
});

export default store;
