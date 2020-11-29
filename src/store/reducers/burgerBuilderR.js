/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
//import order from '../../components/Order/Order';

const initialState = {

    ingredients:null, //becomes object
    totalPrice: 4,
    error: false,
    building: false, // used when redirecting from Auth page which we accessed from Sign in to order button
    ingredientsOrder:[null], //added this to try and set the order of ingredients by user clicks
};
const  PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const addIngredient = (state,action) => {
                    
    const updatedIng = {[action.ingName]: state.ingredients[action.ingName] +1}    //has to be an object
    // console.log(updatedIng) - gives me e.g. {meat: 1}     
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    
    let testOrder = [...state.ingredientsOrder];
    testOrder.push(action.ingName);
    
    const updatedState = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + PRICES[action.ingName],
        building: true,
        ingredientsOrder: testOrder,
    }
    
    return updateObject(state, updatedState)
}
const removeIngredient = (state,action) =>{
    const updatedIng2 = {[action.ingName]: state.ingredients[action.ingName] -1}
                                 //has to be an object
    const updatedIngs2 = updateObject(state.ingredients, updatedIng2)

    let reversedOrder = [...state.ingredientsOrder].reverse();
            let i=0;
            while(i < reversedOrder.length){
                if(reversedOrder[i]===action.ingName){
                    reversedOrder.splice(i,1);
                    i+=reversedOrder.length;
                }
                i++;
            }

    const updatedState2 = {
        ingredients: updatedIngs2,
        totalPrice: state.totalPrice - PRICES[action.ingName],
        ingredientsOrder: reversedOrder.reverse(),
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
        building: false,
        ingredientsOrder: [],
      }
      
    return updateObject(state,updatedSetIngs); 
}
const defaultInitialState = (state) => {
    console.log('reverting to default InitialState')

    return updateObject(state, {//forgot to add return before
        ingredients:null,
        totalPrice: 4,
        error: false,
        building: false, 
    })
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

        case actionTypes.CLEAR_ING: return defaultInitialState(state)
        
        default: return state;
    }

};

export default reducer;
