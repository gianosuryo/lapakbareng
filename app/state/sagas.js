import productSagas from './product/sagas';
import categorySagas from './category/sagas';
import cartSagas from './cart/sagas';
import addressSagas from './address/sagas';
import tokoSagas from './toko/sagas';

export default [
    productSagas,
    cartSagas,
    categorySagas,
    addressSagas,
    tokoSagas
];