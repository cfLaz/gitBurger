/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

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

const addIngredient = (state,action) => {

    const updatedIng = {[action.ingName]: state.ingredients[action.ingName] +1}                             //has to be an object
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updatedState = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + PRICES[action.ingName],
    }
    return updateObject(state, updatedState)
}
const removeIngredient = (state,action) =>{
    const updatedIng2 = {[action.ingName]: state.ingredients[action.ingName] -1}                             //has to be an object
            const updatedIngs2 = updateObject(state.ingredients, updatedIng2)
            const updatedState2 = {
                ingredients: updatedIngs2,
                totalPrice: state.totalPrice - PRICES[action.ingName],
            }
            return updateObject(state, updatedState2)
}

const setIngredients = (state,action) => {
    const updatedSetIngs = {
        ingredients: {//bcz of order of ingredients
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat,
        },
        error:false,
        totalPrice: 4,
      }
    
    return updateObject(state,updatedSetIngs); 
}


const reducer = (state= initialState, action) => {
    switch(action.type) {
        
        case actionTypes.ADD_ING: return addIngredient(state,action)
           /*{
                ...state,
                ingredients: {
                    ...state.ingredients,
            // not an array, ES6 special syntax, dynamically overriding property in given JS object
                    [action.ingName]: state.ingredients[action.ingName] +1,
                },
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + PRICES[action.ingName],
            }*/
        case actionTypes.REMOVE_ING: return removeIngredient(state,action)

        case actionTypes.SET_ING: return setIngredients(state,action) 

        case actionTypes.FETCH_ING_FAILED: return updateObject(state, {error: true})

        default: return state;
    }

};

export default reducer;
