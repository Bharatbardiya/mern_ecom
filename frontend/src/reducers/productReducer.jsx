import { createReducer } from "@reduxjs/toolkit";

export const ProductReducer = createReducer(
  {
    products: [],
    loading: false,
    error: null,
    productCount: 0,
  },
  {
    ALL_PRODUCTS_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
      state.products = [];
    },
    ALL_PRODUCTS_SUCCESS: (state, action) => {
      const data = action.payload;
      state.loading = false;
      state.products = data.products;
      state.productCount = data.productCount;
      state.error = null;
    },
    ALL_PRODUCTS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);
