import {
    put,
    call,
    takeLatest,
    fork,
} from 'redux-saga/effects'

import { 
    FETCH_CART, 
    ADD_TO_CART,
    REMOVE_FROM_CART 
} from "../actionTypes";

import { 
    fetchCartSuccess, 
    fetchCartFailure, 
    addToCartSuccess, 
    addToCartFailure,
    removeFromCartSuccess, 
    removeFromCartFailure  
} from "./actions";

import * as cartApi from '../../libs/cart/api';

export function* fetchCart(){
    try {
        const cart = yield call(cartApi.fetch);
        yield put(fetchCartSuccess(cart));
    } catch(error){
        yield put(fetchCartFailure(error));
    }
}

export function* addToCart(action){
    try { 
        const cart = yield call(cartApi.addToCart, action.id, action.kuantitas);
        yield put(addToCartSuccess(cart));
    } catch(error){
        yield put(addToCartFailure(error));
    }
}

export function* removeFromCart(action){
    try { 
        const cart = yield call(cartApi.removeFromCart, action.id);
        yield put(removeFromCartSuccess(cart));
    } catch(error){
        yield put(removeFromCartFailure(error));
    }
}

export function* watchFetchCart(){
    yield takeLatest(FETCH_CART, fetchCart);
}

export function* watchAddToCart(){
    yield takeLatest(ADD_TO_CART, addToCart);
}

export function* watchRemoveFromCart(){
    yield takeLatest(REMOVE_FROM_CART, removeFromCart);
}

export default function* (){
    yield fork(watchFetchCart);
    yield fork(watchAddToCart);
    yield fork(watchRemoveFromCart);
}