import {put, delay, call} from 'redux-saga/effects'; //put dispatches a new action, call- call some function on some object
//import * as actionTypes from "../actions/actionTypes";
import * as actions from '../actions/indexA';
import axios from 'axios';

//kind of a function, generator - functions that can be executed incrementally
export function* logoutSaga(action) {
// with yield, it waits until the action is finished before moving to next line of code in the generator
    yield call([localStorage, 'removeItem'], "token");// makes is useful for testing, (can mock it and not really execute it)
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userID');
    /* yield put({
        type: actionTypes.AUTH_LOGOUT,
    }) */
    yield put(actions.logoutSucceed())

}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    // wait for it to expire then run logout in saga style
    yield put (actions.logout());
}

// still confused about the 'action' since it's weirdly connected...!-> action is everything that is returned in object from actions file
export function* authSaga(action) {
    yield put(actions.authStart);

    const authData={
        email: action.email,
        password: action.password,
        returnSecureToken: true,        
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNoBWJbk5XEwrnLpG0PBSs-G4WS13FgPg';
    
    if(!action.isSignUp){
        url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNoBWJbk5XEwrnLpG0PBSs-G4WS13FgPg';
    }
    try {
    // with const x = yield axios, we wait unti promise is resolved or rejected and assign it to x, we don't need 'then' and 'catch'  
    const response = yield axios.post(url,authData);
        console.log(response); //here is where we get the token
        
        const expirationDate= new Date(new Date().getTime() + response.data.expiresIn *1000 )
        //no need to put yield in front of localStorage since it's a synchronous code
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        //can check it out in f12 -> application
        localStorage.setItem('userId', response.data.localId)

        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));

    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
    
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
        if (!token) {
            yield put(actions.logout());

        } else {                //converting string to date object
            const expirationDate = yield new Date(localStorage.getItem('expirationDate')); 

            if (expirationDate <= new Date()){
                yield put(actions.logout());
            } else {
                const userId = yield localStorage.getItem('userId');
                yield put(actions.authSuccess(token, userId));
                //can fetch id from firebase (337 - 9:30)

                yield put(actions.checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000 )); //getTime() gives us time in miliseconds (338 05:40)

            }
        }
    }
/* Sergey Petushkou
Do not understand a purpose of Redux Saga
6
Sergey · Lecture 416
· 3 months ago

Hello,

I do not understand a purpose of Redux Saga. What is an advantage  of implementing this middleware step?


Before:

action creator -> dispatch an action -> change state in a reducer


After:

action creator -> dispatch an action -> capture the action by Saga -> dispatch an action  -> change state in a reducer


Is this just for putting side effect actions into a separate thing named Saga? Why to do that if side effect actions are working just fine without Saga?

3 replies
CP
Channa Dias
3 months ago
7

The redux team actually has an opinion on this:

https://redux<dot>js<dot>org/faq/actions#what-async-middleware-should-i-use-how-do-you-decide-between-thunks-sagas-observables-or-something-else

(Replace the <dot> with a .)

They mostly do the same thing. They're a bit more powerful and easier to write, if you have complex asynchronous logic.

Since async-await, writing simple asynchronous logic is quite alright with redux-thunk.

Basically, if you find you're asynchronous code is getting out of hand in thunk, or if you feel that you'd like your action creators to be cleaner, use sagas.

Otherwise, thunk is perfectly fine for most use cases. It's very much a "when you use it right, you'll know why you used it". */