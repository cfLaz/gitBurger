/* eslint-disable default-case */
import * as actionTypes from './actions';

const initialState = {

    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4,
};
const  PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};
const reducer = (state= initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ING:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
            // not an array, ES6 special syntax, dynamically overriding property in given JS object
                    [action.ingName]: state.ingredients[action.ingName] +1,
                },
                totalPrice: state.totalPrice + PRICES[action.ingName],
            }
        case actionTypes.REMOVE_ING:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] -1,
                },
                totalPrice: state.totalPrice - PRICES[action.ingName],
            }
        default:
            return state;
    }

};

export default reducer;
