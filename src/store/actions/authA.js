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
    /* localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userID'); */

    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT,
    }
};
export const logoutSucceed =()=> {
    return{type: actionTypes.AUTH_LOGOUT};
}

//without this, token would expire afer one hour without us knowing, so if we are signed in, we wouldn't proceed with valid token, or could not proceed anywhere at all?
/* const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout)
        }, expirationTime * 1000);
    };
}; */
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

/* export const auth = (email, password,isSignUp) => {
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
            
            const expirationDate= new Date(new Date().getTime() + response.data.expiresIn *1000 )
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            //can check it out in f12 -> application
            localStorage.setItem('userId', response.data.localId)

            dispatch(authSuccess(response.data.idToken, response.data.localId));

            dispatch(checkAuthTimeout(response.data.expiresIn));

        }).catch(err => {
             //   console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
}; */

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

/* export const authCheckState =() => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());

        } else {                //converting string to date object
            const expirationDate = new Date(localStorage.getItem('expirationDate')); 

            if (expirationDate <= new Date()){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                //can fetch id from firebase (337 - 9:30)

                dispatch(checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000 )); //getTime() gives us time in miliseconds (338 05:40)

            }
        }
    }
} */