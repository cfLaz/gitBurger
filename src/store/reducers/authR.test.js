import reducer from './authR';
//no need to test connection to redux
//no need for enzyme since we're not testing any React components
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', ()=> {
   
    it('should return the initial state', () =>{
        //pass undefined as initial state (satate is just getting to set up at beginning of our app), action is just an empty object (no specific action), guess because we have to put something?
        expect(reducer(undefined, {}) ).toEqual({
                            //toBe() checks if they are esact same object in memory
            token: null,
            userID: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    });

    it('should store the token upon login', ()=>{

        expect(reducer({
            token: null, //initial state in the reducer arg
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
          }, {
              type:actionTypes.AUTH_SUCCESS,
              token: 'some-token', //payload
              userId: 'some-user-id', //payload
          })
            ).toEqual({
                token: 'some-token',
                userId: 'some-user-id',
                error: null,
                loading: false,
                authRedirectPath: '/',
            });
    })

});

/* What we should check: reducers, compoenents, is proper prop passed when we click some button...*/