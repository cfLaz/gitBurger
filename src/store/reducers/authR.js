/* eslint-disable default-case */
import * as actions from '../actions/actionTypes';
import {updateObject} from '../utility';
import { logout } from '../actions/authA';

const initialState ={
    token: null,
    userID:null,
    error: null,
    loading: false,
};
const authStart =(state,action) => {
    return updateObject(state, {error: null, loading: true}) 
}
const authSuccess = (state,action) => {
    return updateObject(state, {
        /* token: action.authData.idToken, //think it needs to be action.authData.data.idToken - it works! (found this out because of console.log(response) from axios.post in const auth from authA.js) */
        token: action.token,
        userId: action.userId, 
        error: null,
        loading: false,
    })
}

const authFailed = (state, action) => {
    return updateObject(state, {
        loading:false,
        error: action.error,
    })
}

const authLogout = (state,action) => {
    //token: null would not work if I return updateObject in {}
    return updateObject(state, {token: null, userID: null });
};
const reducer = (state=initialState, action) => {
    switch (action.type){

        case actions.AUTH_START:
            return authStart(state,action);

        case actions.AUTH_SUCCESS: return authSuccess(state,action)

        case actions.AUTH_FAIL: return authFailed(state,action)

        case actions.AUTH_LOGOUT: return authLogout(state,action)

        default:
            return state;
    }
};

export default reducer;