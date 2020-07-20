import {takeEvery, all, takeLatest} from 'redux-saga/effects'; // takeEvery will allow us to listen to certain actions and do something when they occur, all runs simultaniously, tL cancels any ongoing executions and only takes the latest one (e.g. user hammers the 'purchase' button)
import {logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga} from './authS';
import {initIngredientsSaga} from './burgerBuilderS';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        // execute (whenever this appars, this)
      takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
      takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
      takeEvery(actionTypes.AUTH, authSaga),
      takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ])
        
    
}

export function* watchBB() {
    yield takeEvery(actionTypes.INIT_ING, initIngredientsSaga)
}

/* export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
} */