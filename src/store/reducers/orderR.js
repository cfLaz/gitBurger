/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
import axios from '../../Axios-orders';

const initialState = {
orders: [], //order IO is inside of orders[number] (orders[number].id)
loading: false,
purchased: false,
//date: null,

};
const purchaseBsuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId}) 
      return updateObject(state,{
        loading:false,
        orders: state.orders.concat(newOrder),
        purchased: true,
    })
}
/* const removeOrder = (state, action) => {
    const removeIndex=(state.orders.map( ord => (
            if(ord.id===action.orderId){
                return (ord.id).indexOf(action.orderId)
            } 
        ) 
    ) )
} */
const removeOrder = (state,action) => {
    console.log(state.orders)
    let k=null;
    for(let i =0; i<state.orders.length; i++){
        if(state.orders[i].id===action.orderId) k=i;
    }
    console.log(state.orders[k]); //it does give me the correct index
    let updatedOrders = state.orders.slice();
    updatedOrders.splice(k,1);
    //works but doesn't remove from firebase [edit: added axios =>xhr.js:178 OPTIONS https://burger-builder-f9f4f.firebaseio.com/orders/-M8Xr-riuYV5-2-W5EzT 405 (Method Not Allowed)]
    
    console.log('order id:' + state.orders[k].id);
    /* const queryParams = '?auth=' + action.token + '&orderBy="orders"&equalTo="'+ state.orders[k].id+'"'; //think it will work like this */

    axios.delete('/orders/'+action.orderId+'.json?auth='+action.token).then(response =>{
        console.log(response);
    }).catch(
        err=> {
            console.log(err);
        }
    );
    return updateObject(state, {orders: updatedOrders});
}


const reducer = (state =initialState, action) => {

    switch (action.type) {

        case actionTypes.PURCHASE_INIT: return updateObject(state, {purchased: false,})

        case actionTypes.PURCHASE_BRG_START: return updateObject(state, {loading: true,})

        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBsuccess(state,action)
            
        case actionTypes.PURCHASE_BURGER_FAILED: return updateObject(state, {loading: false});

        case actionTypes.FETCH_ORDER_START: 
        return updateObject(state, {loading: true});

        case actionTypes.FETCH_ORDER_SUCCESS:
            return updateObject(state, {
                loading: false,
                orders: action.orders,
                //date: action.date,
            })

         case actionTypes.FETCH_ORDER_FAIL: return updateObject(state, {loading: false});

         case actionTypes.REMOVE_ORDER : return removeOrder(state, action)
        
        default: return state;
    }

};

export default reducer;