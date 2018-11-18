import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas'
import reducer from './reducer';


export default (initialState) => {
    const sagaMiddleware = createSagaMiddleware();
    //const composenhancers = window.
    const enhancers = compose(applyMiddleware(sagaMiddleware));
    const store = createStore(
        reducer,
        initialState,
        enhancers
    );

    sagas.map(sagaMiddleware.run);
    return store;
}