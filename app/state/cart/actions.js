import {
    FETCH_CART,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILURE,
    ADD_TO_CART,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    REMOVE_FROM_CART,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
} from '../actionTypes';

export const fetchCart = () => ({
    type: FETCH_CART,
})
export const fetchCartSuccess = (cart) => ({
    type: FETCH_CART_SUCCESS,
    cart
})
export const fetchCartFailure = (error,) => ({
    type: FETCH_CART_FAILURE,
    error
})
export const addToCart = (id, kuantitas) => ({
    type: ADD_TO_CART,
    id,
    kuantitas,
})
export const addToCartSuccess = (cart) => ({
    type: ADD_TO_CART_SUCCESS,
    cart,
})
export const addToCartFailure = (error) => ({
    type: ADD_TO_CART_FAILURE,
    error
})

export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    id
})
export const removeFromCartSuccess = (cart) => ({
    type: REMOVE_FROM_CART_SUCCESS,
    cart,
})
export const removeFromCartFailure = (error) => ({
    type: REMOVE_FROM_CART_FAILURE,
    error
})