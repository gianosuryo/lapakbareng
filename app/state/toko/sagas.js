import {put, fork, takeLatest, call} from 'redux-saga/effects';
import {
    FETCH_TOKO
} from '../actionTypes';
import {fetchTokoFailure, fetchTokoSuccess } from './actions';
import * as productApi from '../../libs/toko/api';

export function* fetchToko(action){
    try{
        const toko = yield call(productApi.fetchAll);
        yield put(fetchTokoSuccess(toko));
    } catch(error){
        yield put(fetchTokoFailure(error));
    }    
}

export function* watchFetchToko(){
    yield takeLatest(FETCH_TOKO, fetchToko);
}

export default function* (){
    yield fork(watchFetchToko);
}