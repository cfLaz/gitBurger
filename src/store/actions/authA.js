import * as actionTypes from './actionTypes';
//import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START,

    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error:error,
    };
};

// there are some actions that are not directly related to changing redux-store,
//this is not bad but if we want our actions to have "cleaner code" we could use Redux Saga

export const logout =() =>  {
     localStorage.removeItem('userID');

    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT,
    }
};
export const logoutSucceed =()=> {
    return{type: actionTypes.AUTH_LOGOUT};
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        expirationTime: expirationTime, //this is 'action' in saga
        type: actionTypes.AUTH_CHECK_TIMEOUT,
    }
}

export const setAuthRedirectPath = (path) => {
    return {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      path: path,
    }
}

export const auth = (email, password,isSignUp) => {
    return {
        type: actionTypes.AUTH,
        email: email,
        password: password,
        isSignUp: isSignUp,
    };
};

export const authCheckState =() => {
    return{
        type: actionTypes.AUTH_CHECK_STATE,
    }
}
