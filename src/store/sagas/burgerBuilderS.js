import {put} from 'redux-saga/effects'; 
import * as actions from '../actions/indexA';
import axios from '../../Axios-orders';

export function* initIngredientsSaga() {

    try {
      const response = yield axios.get('https://burger-builder-f9f4f.firebaseio.com/ingredients.json');
           
      yield put(actions.setIngredients(response.data));
      /* .catch(error=> {
                dispatch(fetchIngFailed()); */
    } 
    catch (error) {
        yield put(actions.fetchIngFailed());
    }  
}