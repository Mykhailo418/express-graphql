import { all } from 'redux-saga/effects';
import { saga as usersSaga } from '../saga/users';

export default function* (){
 	yield all([usersSaga()])
}
