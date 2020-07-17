import {put} from 'redux-saga/effects'; //dispatches a new action
import * as actionTypes from "../actions/actionTypes";
//kind of a function, generator - functions that can be executed incrementally

export function* logoutSaga(action) {
// with yield, it waits until the action is finished before moving to next line of code in the generator
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userID');
    yield put({
        type: actionTypes.AUTH_LOGOUT,
    })
}