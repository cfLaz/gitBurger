import * as actionTypes from './actionTypes';
//import axios from '../../Axios-orders';
 
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_ING,
        ingName: name,
    }
} ;

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_ING,
        ingName: name,
    }
} ;

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_ING,
        ingredients: ingredients,
    }
}

export const fetchIngFailed = () => {
    return {
        type: actionTypes.FETCH_ING_FAILED,
    };
}

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_ING
    };
};

/* export const initIngredients = () => {
    //available bcz of redux-thunk
    return dispatch => {
        axios.get('https://burger-builder-f9f4f.firebaseio.com/ingredients.json').then(
           response => {
               dispatch(setIngredients(response.data));
           }).catch(error=> {
              dispatch(fetchIngFailed());
           })
    };
}; */