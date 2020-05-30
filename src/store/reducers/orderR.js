/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
import { purchaseBsucess } from '../actions/orderA';
const initialState = {
orders: [],
loading: false,
purchased: false,


};
const purchaseBsuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId}) 
      return updateObject(state,{
        loading:false,
        orders: state.orders.concat(newOrder),
        purchased: true,
    })
}
const reducer = (state =initialState, action) => {

    switch (action.type) {

        case actionTypes.PURCHASE_INIT: return updateObject(state, {purchased: false,})

        case actionTypes.PURCHASE_BRG_START: return updateObject(state, {loading: true,})

        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBsucess(state,action)
            
        case actionTypes.PURCHASE_BURGER_FAILED: return updateObject(state, {loading: false});

        case actionTypes.FETCH_ORDER_START: return updateObject(state, {loading: true});

        case actionTypes.FETCH_ORDER_SUCCESS:
            return updateObject(state, {
                loading: false,
                orders:action.orders,
            })

         case actionTypes.FETCH_ORDER_FAIL: return updateObject(state, {loading: false});
        
        default: return state;
    }

};

export default reducer;