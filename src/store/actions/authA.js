import * as actionTypes from './actionTypes';
import axios from 'axios';

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
export const logout =() =>  {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
};
//without this, token would expire afer one hour without us knowing, so if we are signed in, we wouldn't proceed with valid token, or could not proceed anywhere at all?
const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout)
        }, expirationTime * 1000);
    };
};

export const auth = (email, password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData={
            email: email,
            password: password,
            returnSecureToken: true,        
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNoBWJbk5XEwrnLpG0PBSs-G4WS13FgPg';
        
        if(!isSignUp){
            url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNoBWJbk5XEwrnLpG0PBSs-G4WS13FgPg';
        }

        axios.post(url,authData).then(response => {
            console.log(response); //here is where we get the token
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};
