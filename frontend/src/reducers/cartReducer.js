import { ADD_TO_CART, REMOVE_ITEM_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (i) => i.product_id === item.product_id
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product_id === isItemExist.product_id ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.product_id !== action.payload
                ),
            };

        default:
            return state;
    }
};
