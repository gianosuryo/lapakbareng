import {put, fork, takeLatest, call} from 'redux-saga/effects';
import {
    FETCH_CATEGORIES,
} from '../actionTypes';
import { fetchCategoriesFailure, fetchCategoriesSuccess } from './actions';
import * as categoryApi from '../../libs/category/api';


export function* fetchCategories(action){
    try{
        const categories = yield call(categoryApi.fetchAll);
        yield put(fetchCategoriesSuccess(categories));
    } catch(error){
        yield put(fetchCategoriesFailure(error));
    }    
}

export function* watchFetchCategories(){
    yield takeLatest(FETCH_CATEGORIES, fetchCategories);
}

export default function* (){
    yield fork(watchFetchCategories);
}