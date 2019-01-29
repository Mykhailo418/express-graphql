import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import { routerReducer } from 'react-router-redux';
import {reducer as form} from 'redux-form';
import usersReducer from '../saga/users';
import history from '../history';

export default (history) => combineReducers({
	router: connectRouter(history),
	routing: routerReducer,
	form,
	usersReducer
});
