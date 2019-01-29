import {createStore, applyMiddleware, compose} from 'redux';
import createRootReducer  from './reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from '../history';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history));

const store = createStore(createRootReducer(history), enhancer);

sagaMiddleware.run(saga);

// dev only
if(DEV_ENV){
	window.store = store;
}

export default store;
