/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';

const initialState = {

    ingredients:null,
    totalPrice: 4,
    error: false,
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

        case actionTypes.SET_ING:
           return {
              ...state,
                //ingredients: action.ingredients, //from setIngredients in bbA
                ingredients: { //doing this bcz of the order of the ingredients
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                error:false,
              }
          

         case actionTypes.FETCH_ING_FAILED:
            return {
                ...state,
                error: true,
             }
        default:
            return state;
    }

};

export default reducer;
