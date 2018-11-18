import {combineReducers} from 'redux';
import productReducer from './product/reducer'
import categoryReducer from './category/reducer'
import cartReducer from './cart/reducer'
import addressReducer from './address/reducer'
import tokoReducer from './toko/reducer'

export default combineReducers({
   product: productReducer, 
   category: categoryReducer, 
   cart: cartReducer, 
   address: addressReducer, 
   toko: tokoReducer, 
});