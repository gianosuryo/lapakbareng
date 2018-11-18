import {
    put,
    call,
    takeLatest,
    fork,
} from 'redux-saga/effects'

import { 
    FETCH_ADDRESS,
    SET_ADDRESS,
    REMOVE_ADDRESS,
} from "../actionTypes";

import { 
    fetchAddressSuccess, 
    fetchAddressFailure, 
    setAddressSuccess, 
    setAddressFailure,
    removeAddressSuccess, 
    removeAddressFailure  
} from "./actions";

import * as addressApi from '../../libs/address/api';

export function* fetchAddress(){
    try {
        const address = yield call(addressApi.fetch);
        yield put(fetchAddressSuccess(address));
    } catch(error){
        yield put(fetchAddressFailure(error));
    }
}

export function* setAddress(action){
    try { 
        const address = yield call(addressApi.setAddress, action.lat, action.lng, action.ongkos, action.alamat);
        yield put(setAddressSuccess(address));
    } catch(error){
        yield put(setAddressFailure(error));
    }
}
///////////
export function* removeAddress(){
    try { 
        const address = yield call(addressApi.removeAddress);
        yield put(removeAddressSuccess(address));
    } catch(error){
        yield put(removeAddressFailure(error));
    }
}

export function* watchFetchAddress(){
    yield takeLatest(FETCH_ADDRESS, fetchAddress);
}

export function* watchSetAddress(){
    yield takeLatest(SET_ADDRESS, setAddress);
}

export function* watchRemoveAddress(){
    yield takeLatest(REMOVE_ADDRESS, removeAddress);
}

export default function* (){
    yield fork(watchFetchAddress);
    yield fork(watchSetAddress);
    yield fork(watchRemoveAddress);
}