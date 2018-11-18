/** @format */
import React from 'react';
import { AppRegistry } from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './app/state/store';
import App from './App';
import { YellowBox } from 'react-native';
//import './app/libs/cart/api';
//import {fetchCart} from './app/state/cart/actions';
//import {fetchProducts} from './app/state/product/actions';
import {fetchCategories} from './app/state/category/actions';
//import {addToCart} from './app/state/cart/actions';
//import {removeFromCart} from './app/state/cart/actions';

import {name as appName} from './app.json';
import _ from 'lodash'; // 4.17.4

const _console = _.clone(console);

const store = configureStore({});
//store.dispatch(fetchCart());
//store.dispatch(fetchProducts());
store.dispatch(fetchCategories());
//store.dispatch(addToCart('donat', 2));
//store.dispatch(removeFromCart('donat', 2));

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Setting a timer']);
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');


console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
  }
};


const myapp = () => {
  return(
    <Provider store ={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => myapp);

