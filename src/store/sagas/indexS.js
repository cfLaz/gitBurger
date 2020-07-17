import {takeEvery} from 'redux-saga/effects'; // takeEvery will allow us to listen to certain actions and do something when they occuy
import {logoutSaga} from './authS';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
        // execute (whenever this appars, this)
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}