import { configureStore } from "@reduxjs/toolkit";
import { ProductReducer } from "./reducers/productReducer";

const store = configureStore({
  reducer: {
    Products: ProductReducer,
  },
});

export default store;
