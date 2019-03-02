import { Record } from 'immutable';
import {push} from 'react-router-redux';
import gql from 'graphql-tag';

import {put, call, take, all, cps, takeEvery, spawn} from 'redux-saga/effects';

// Constants
export const moduleName = 'users';
const prefix = `${moduleName}`;
export const GET_USERS_REQUEST = `${prefix}/GET_USERS_REQUEST`;
export const GET_USERS_SUCCESS = `${prefix}/GET_USERS_SUCCESS`;
export const GET_USERS_ERROR = `${prefix}/GET_USERS_ERROR`;

// Selectors

// Reducer
export const ReducerRecord = Record({
  users: [],
  loading: true
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS_REQUEST:
        return state.set('loading', true);
    case GET_USERS_SUCCESS:
      	return state
                .set('loading', false)
                .set('users', payload.users);
    case GET_USERS_ERROR:
    	console.error(type, payload.error);
    	return state.set('loading', false);
    default:
      	return state;
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export function getUsers(){
	return {
		type: GET_USERS_REQUEST
	};
}

export function* getUsersSaga(){
  while (true) {
       yield take(GET_USERS_REQUEST);

       const users = yield call();
       yield put({
         type: GET_USERS_SUCCESS,
         payload: {users}
       })
   }
}

// Saga
export const saga = function* (){
    yield all([
      getUsersSaga(),
    ]);
}
